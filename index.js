const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ObjectID = require("mongodb").ObjectID;

const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 4000;

// Root API
app.get("/", (req, res) => {
  res.send("Welcome to ar-creative-agency-server");
});

// MongoDB Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ydzqi.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
    console.log("dbConnected");

    // collections
    const apartmentsCollection = client
      .db(process.env.DB_NAME)
      .collection("apartments");

    //   collections end
    // ------------------------------------------------
  
    //==================== All API =========================
    // Get Apartment
    app.get("/apartment", (req, res) => {
        const id = req.query.id;
        console.log(id);
        res.send(id);
    })

    // Post Apartment
    app.post("/apartment", (req, res) => {
        res.send("Post API for Apartment");
    })

    // Get Bookings
    app.get("/bookings", (req, res) => {
        res.send({msg: "All Bookings"})
    })
    
    // Get Single User Bookings
    app.get("/booking", (req, res) => {
        res.send("All Bookings")
    })
    



    //==================== All API End =====================
    // ------------------------------------------------
    // client connect close
  });


// Listening Request
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
  