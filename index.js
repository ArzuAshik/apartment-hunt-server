const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectID = require("mongodb").ObjectID;
const app = express();

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root API
app.get("/", (req, res) => {
  res.send("Welcome to apartment Hunt server");
});

// MongoDB Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydzqi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect(() => {
  console.log("connected");
  // All collections
  const apartmentsCollection = client
  .db(process.env.DB_NAME)
  .collection("apartments");

  const bookingsCollection = client
  .db(process.env.DB_NAME)
  .collection("bookings");

  //   collections end
  // ------------------------------------------------
  

  //==================== All API =========================
  // Get Apartment
  app.get("/apartment", (req, res) => {
    const id = req.query.id;
    const search = id ? { _id: ObjectID(id) } : {};
    apartmentsCollection.find(search)
    .toArray((err, apartments) => {
      res.send(apartments)
    })
  })

  // Post Apartment
  app.post("/apartment", (req, res) => {
    const {ownerEmail, title, location, bedroom, bathroom, price, img} = req.body;
    if(ownerEmail && title && location && bedroom && bathroom && price && img){
      apartmentsCollection.insertOne({ownerEmail, title, location, bedroom, bathroom, price, img})
      .then(()=>{
        res.send("success");
      })
    }else{
      res.send("err");
    }
  })

  // Get Bookings
  app.post("/bookings", (req, res) => {
    const ownerEmail = req.body.ownerEmail;
    bookingsCollection.find({ownerEmail})
    .toArray((err, docs) => {
      res.send(docs)
    })
  })

  //update Order Status
  app.patch("/bookings", (req, res) => {
    bookingsCollection
      .updateOne(
        { _id: ObjectID(req.body.id) },
        { $set: { status: parseInt(req.body.status) } }
      )
      .then((result) => {
        res.send(result);
      });
  });
    
  // Request for Rent
  app.post("/booking-request", (req, res) => {
    const {name, email, phone, msg, ownerEmail, houseName, price, houseId} = req.body;
    if(name && email && phone && msg && ownerEmail && houseName && price && houseId){
      bookingsCollection.insertOne({name: name, email: email, phone: phone, msg: msg, ownerEmail: ownerEmail, houseName: houseName, price: price, houseId: houseId, status: 0})
      .then(() =>{
        res.send("success");
      })
    }else{
      res.send("some data is missing");
    }
  })

  // Get My Bookings
  app.post("/my-bookings", (req, res) => {
    const {email} = req.body;
    bookingsCollection.find({email: email}).toArray((err, bookings) =>{
      res.send(bookings);
    })
  })
    
  //==================== All API End =====================
  // ------------------------------------------------
});


// Listening Request
const port = 4000;
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
