# [apartment-hunt-server](https://apartment-hunt-server.herokuapp.com/)

API URL List
| URL | TYPE | Params |
| ---- | :----: | ------- |
| [/apartment](https://apartment-hunt-server.herokuapp.com/apartment) | GET | - |
| [/apartment?id="xyz"](https://apartment-hunt-server.herokuapp.com/apartment) | GET | - |
| [/apartment](https://apartment-hunt-server.herokuapp.com/apartment) | POST | ownerEmail, title, location, bedroom, bathroom, price, img |
| [/bookings](https://apartment-hunt-server.herokuapp.com/bookings) | POST | ownerEmail |
| [/bookings](https://apartment-hunt-server.herokuapp.com/bookings) | PATCH | id, status |
| [/booking-request](https://apartment-hunt-server.herokuapp.com/booking-request) | POST | name, email, phone, msg, ownerEmail, houseName, price, houseId |
| [/my-bookings](https://apartment-hunt-server.herokuapp.com/my-bookings) | POST | email |

# Guide

## Getting list of Apartment

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/apartment")
  .then((response) => response.json())
  .then((apartments) => console.log(apartments));
```

### output

```
[
    {
        _id: "dfasdfjdf",
        ownerEmail: "LoggedIn User's Email",
        title: "Apartment Name",
        location: "Location of the APartment",
        bedroom: 3,
        bathroom: 3,
        price: 8000,
        img: "https://i.ibb.co/xyz.png"
    },
    {...}, {...}
]

```

## Getting Single Apartment by ID

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/apartment?id="xyz")
  .then((response) => response.json())
  .then((apartments) => console.log(apartments));
```

### output

```
[
    {
        _id: "dfasdfjdf",
        ownerEmail: "LoggedIn User's Email",
        title: "Apartment Name",
        location: "Location of the APartment",
        bedroom: 3,
        bathroom: 3,
        price: 8000,
        img: "https://i.ibb.co/xyz.png"
    }
]

```

## Add New Apartment

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/apartment", {
  method: "POST",
  body: JSON.stringify({
    ownerEmail: "LoggedIn User's Email",
    title: "Apartment Name",
    location: "Location of the APartment",
    bedroom: 3,
    bathroom: 3,
    price: 8000,
    img: "https://i.ibb.co/xyz.png",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((apartments) => console.log(apartments));
```

### Output

```
Post API for Apartment
```

## Get List of Bookings of The House Owner

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/bookings", {
  method: "POST",
  body: JSON.stringify({
    ownerEmail: "LoggedIn User's Email",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((bookings) => console.log(bookings));
```

### Output

```
[
    {
        _id :5fb245ba5644ab0aa400dd02
        name :"test"
        email :"test@tt.cc"
        phone :"017xxxxxxxx"
        msg :"msg"
        ownerEmail :"arzu2050@gmail.com"
        status :1
    },
    {...}, {...}
]
```

## Update The Status of Booking Request

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/bookings", {
  method: "PATCH",
  body: JSON.stringify({
    id: "dfdfdadf",
    status: 1,
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
})
  .then((response) => response.json())
  .then((bookings) => console.log(bookings));
```

## Request for a Bookings

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/booking-request", {
  method: "POST",
  body: JSON.stringify({
    name: "Any Name",
    email: "Any valid Email",
    phone: "017xxxxxxxx",
    msg: "any message",
    ownerEmail: "email@cc.c",
    houseName: "Arzu Vila",
    price: 941,
    houseId: "5fb3639149e95300174dbbd2",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((bookings) => console.log(bookings));
```

### Output

```
success
```

## Get List of My Bookings

```javascript
fetch("https://apartment-hunt-server.herokuapp.com/my-bookings", {
  method: "POST",
  body: JSON.stringify({
    email: "LoggedIn User's Email",
  }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
}).then((bookings) => console.log(bookings));
```

### Output

```
[
  {
    name: "AR Arzu",
    email: "arzu@ar.com",
    phone: "01794xxxxxx",
    msg: "Lorem Ipsum",
    ownerEmail: "ar@arzu.com",
    houseName: "Arzu Vila",
    price: "941",
    houseId: "5fb3639149e95300174dbbd2"
  },
  {...},
  {...}
   ....
]
```
