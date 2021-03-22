
const express = require("express");
const app = require('express')();

const spawn = require('child_process').spawn;






var server = require('http').createServer(app);
var io = require('socket.io')(server);

const path = require("path");
const cors = require("cors");
const axios = require("axios");




const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("./config/config");
var url = config.mongoURI;



// var notify = require("./route/notification/notify");



////var verifyemail = require("./route/emailservicce/verifyemail");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,PATCH,GET");
    return res.status(200).json({});
  }
  next();
});

















const router = express.Router();

router.post("/getLocations", (req, res) => {
  console.log("hahahahhah")
  // var lat=74.2227181;
  // var long=31.4137617;

  var lat=parseFloat(req.body.lat);
  var long=parseFloat(req.body.long);
  console.log(lat)
  console.log(long)
  

      const process = spawn('python', ['Locations.py',lat,long]);
   
      // collect data from script
      process.stdout.on('data',data=>{
        console.log('after process')


      try{
        
        myarray=JSON.parse(data)
        res.json(myarray)
      
     /////   var test=data;
      
        console.log(myarray)
      }
      catch{

        
      }
       
      
         ////res.json(JSON.parse(data.toString()))
         
         
         
         ;})
        
  
  })


app.use(cors());
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 5000;
app.use("/api", router);
server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});












