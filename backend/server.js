
const express = require("express");
const app = require('express')();

const spawn = require('child_process').spawn;

const { Expo } = require("expo-server-sdk");

const expo = new Expo();








var server = require('http').createServer(app);
var io = require('socket.io')(server);

const path = require("path");
const cors = require("cors");
const axios = require("axios");
var register = require("./route/register/register");

var signinuser = require("./route/signin/sigininuser");
var bupload = require("./route/upload/bupload");
var fetchcards = require("./route/fetchdata/fetchcards");
var comment = require("./route/fetchdata/commentscards");
var profiledata = require("./route/profilefetch/profiledata");
var like = require("./route/fetchdata/likecards");
var follow = require("./route/fetchdata/follow");
var forgetpass = require("./route/emailservicce/forgetpass");
var searches = require("./route/search/handlesearches");

var bucket = require("./route/bucketsearch/bucket");

var deletedeal = require("./route/delete/deletedeal");




const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("./config/config");
var url = config.mongoURI;



// var notify = require("./route/notification/notify");



var verifyemail = require("./route/emailservicce/verifyemail");

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






const handlePushTokens = ( title, body,to ) => {

    let notifications = [];

      notifications.push({
        to: to,
        sound: "default",
        title: title,
        body: body,
        
        data: { body },
    
        
      });

  
    let chunks = expo.chunkPushNotifications(notifications);
    console.log(chunks);
  
    (async () => {
      for (let chunk of chunks) {
        console.log("11111111111111111111111111");
        try {
          let receipts = await expo.sendPushNotificationsAsync(chunk);
        
          console.log(receipts);
        } catch (error) {
          console.error(error);
        }
      }
      notifications=[];
    })();
  };











const router = express.Router();

router.post("/getLocations", (req, res) => {
  console.log(req.body)
  
      const process = spawn('python', ['Locations.py',req.body.lat]);
      console.log('after process')
      // collect data from script
      process.stdout.on('data',data=>{
        console.log(data.toString());
      

         res.json(data.toString())
         
         
         
         ;})
        
  
  })









bucket(router);
deletedeal(router);
verifyemail(router);
forgetpass(router);
searches(router);
follow(router);
 profiledata(router);
like(router);
// notify(router);
comment(router);
fetchcards(router);
bupload(router);

register(router);

signinuser(router);



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


router.post("/message", (req, res) => {
  /////console.log(req.body);
  handlePushTokens(req.body);
  console.log(`Received message, with title: ${req.body.to}`);
  console.log(`Received message, with title: ${req.body.title}`);
  res.send(`Received message, with title: ${req.body.title}`);
});





router.post("/adminpush", async(req, res) => {
  console.log(req.body);
 /// handlePushTokens(req.body);












 var allposts=[];

     
     MongoClient.connect(url, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     },async function(err, db) {
       if (err) throw err;
       var dbo = db.db("localdeals");




      //  var myobj = { adminpass: "E7r9t8@Q#h%Hy+M" };
      //  dbo.collection("admin").insertOne(myobj, function(err, res) {
      //    if (err) throw err;
      //    console.log("1 document inserted");
      //  ///  db.close();
      //  });






       dbo.collection("admin").findOne({adminpass:req.body.adminpass}, async function(err, result) {
        if (err) throw err;
        console.log(result);
        if(result==null || result=="" ){
          res.json("You are not a admin");
        }
     else{








       /*Return only the documents with the address "Park Lane 38":*/
       var query = {};
   
       allposts= await dbo.collection('users').aggregate([
         { $match : {}},
        
        
      
       {   
           $project:{
            expotoken: 1,
      
           } 
       }
         ]).toArray()
  
           
 console.log(allposts);
 
         for(var x = 0; x<allposts.length; x++) {

        ///  allposts[x]._id
var i=0;
        console.log(i+allposts[x].expotoken);
        i++;

          handlePushTokens(req.body.title,req.body.data,allposts[x].expotoken)
        
                 
               }
                 
             
             
             
             
             
             
                   ///  console.log(allposts);
                     res.json(allposts);
     
     
     
 
 
           
           
           
           
   
                    }
                  });
            
   
   
   
   
      });
     







 
});










// ---------------------------------------------------------

// const express = require("express");
// const { Expo } = require("expo-server-sdk");
// const app = express();
// const expo = new Expo();
// const cors = require("cors");

// app.use(cors());
// let savedPushTokens = [];
// const PORT_NUMBER = 5000;

// const handlePushTokens = ({ title, body,to }) => {

// ////  console.log("hahahahahahhahaha"+to)
//   let notifications = [];
//  //// for (let pushToken of savedPushTokens) {
//     // if (!Expo.isExpoPushToken(pushToken)) {
//     //   console.error(`Push token ${pushToken} is not a valid Expo push token`);
//     //   continue;
//     // }

//     notifications.push({
//       to: to,
//       sound: "default",
//       title: title,
//       body: body,
//       data: { body }
//     });
//  /// }

//   let chunks = expo.chunkPushNotifications(notifications);
//   console.log(chunks);

//   (async () => {
//     for (let chunk of chunks) {
//       console.log("11111111111111111111111111");
//       try {
//         let receipts = await expo.sendPushNotificationsAsync(chunk);
      
//         console.log(receipts);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     notifications=[];
//   })();
// };

// // const saveToken = token => {
// //   console.log(token, savedPushTokens);
// //   const exists = savedPushTokens.find(t => t === token);
// //   if (!exists) {
// //     savedPushTokens.push(token);
// //   }
// // };

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Push Notification Server Running");
// });

// app.post("/token", (req, res) => {

//   saveToken(req.body.token.value);
//   console.log(`Received push token, ${req.body.token.value}`);
//   res.send(`Received push token, ${req.body.token.value}`);
// });


// app.listen(PORT_NUMBER, () => {
//   console.log(`Server Online on Port ${PORT_NUMBER}`);
// });