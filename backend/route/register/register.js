const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
const nodemailer = require("nodemailer");
var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));

var usermodel = require("../../model/modeluser");
var myuser = usermodel.find({});

const bodyParser = require("body-parser");
// aws.config.update({
//   secretAccessKey: config.secretAccessKey,
//   accessKeyId: config.accessKeyId,
//   region: "us-east-1",
// });
// s3 = new aws.S3();

module.exports = function (router) {
 




  

  // var sesTransport = require('nodemailer-ses-transport');

  // var SESCREDENTIALS = {
  //   accessKeyId : "AKIAJRTZKO36XVH3UU7Q" ,
  //   secretAccessKey : "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"
  // };

  // var transport = nodemailer.createTransport(sesTransport({
  //     accessKeyId: SESCREDENTIALS.accessKeyId,
  //     secretAccessKey: SESCREDENTIALS.secretAccessKey,
  //     rateLimit: 5
  // }));



  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
  
    auth: {
      user: "latestlocaldealz@gmail.com",
      pass: "Annie2020!",
    },
  });












 

  router.post("/users/signup", async (req, res1) => {
    var finalcode=(Math.floor(100000 + Math.random() * 900000))
  
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      dbo.collection("users").findOne({  username: (req.body.username).toLowerCase()}, function (err, result) {
          if (err) throw err;
          console.log(result);
          if (result == null) {
            dbo.collection("users").findOne({  email: req.body.email}, function (err, result) {
              if (err) throw err;
              console.log(result);
              if (result == null) {
                var userdetail = new usermodel({
                  fname: (req.body.fname).toLowerCase(),
                  lname: (req.body.lname).toLowerCase(),
                  username: (req.body.username).toLowerCase(),
                  email: req.body.email,
                  pass: req.body.pass,
                  pic:'https://i.ibb.co/6gB1mQF/User-icon.png',
                  following:0,
                  follower:0,
                  expotoken:req.body.expotoken,
                  verify:finalcode.toString()
            
                  
                });
            
                userdetail.save(function (err, res) {
                  if (err) throw err;
            
                  myuser.exec(function (err, data) {
                    if (err) throw err;
            
                    const message = {
                      from: "latestlocaldealz@gmail.com", // Sender address
                      to: req.body.email, // List of recipients
                      subject: "Verify YOur Email", // Subject line
                     //// text: "", // Plain text body
                     html: '<html><body><h1>Welcome To  Latest Local Dealz <a href="https://latestlocaldealz.com/Confirm" target="_blank">Click Here For Website confirmation</a></h1><h2>Verify Email</h2><p>Put That Code in app</p> <h3>'+finalcode+'</h3></body><br><br><br><h4>Developed by</h4><a href="https://www.encodersoft.co/" target="_blank">Encodersoft</a></html>'
      
                     
                    };
      
                     transport.sendMail(message, function (err, info) {
                      if (err) {
                        console.log(err);
                        res1.json("Account Has been created.Check Your Email for verification code.Thanks");
                      } else {
                        console.log(info);
                        res1.json("Account Has been created.Check Your Email for verification code.Thanks");
                      }
                      
                    });
      
                  });
                });  
    
              }
              else {
                  res1.json("Email Already Exist");
                  console.log('no');
              }
    
            
          });

          }
          else {
              res1.json("This Username Already Taken");
              console.log('no');
          }

        
      });
  });

   
  });
};
