const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
const nodemailer = require("nodemailer");
var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));




const bodyParser = require("body-parser");


module.exports = function (router) {



  //   let transport = nodemailer.createTransport('SES', {
  //     AWSAccessKeyID: 'AKIAJRTZKO36XVH3UU7Q', // real one in code
  //     AWSSecretKey: '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', // real one in code
  //     ServiceUrl: 'email-smtp.us-west-1.amazonaws.com'
  // });



  // var sesTransport = require('nodemailer-ses-transport');

  // var SESCREDENTIALS = {
  //   accessKeyId : "AKIAJRTZKO36XVH3UU7Q" ,
  //   secretAccessKey : "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"
  // };



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




 

 

  router.post("/users/forgetpass", async (req, res5) => {




var msg="Your Email not Exist or some thing bad happened";








    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").findOne({  email: req.body.email}, function (err, result) {
            if (err) throw err;

            console.log(result);
            if (result != null) {
               //  console.log(result);
               const message = {
                from: "latestlocaldealz@gmail.com", // Sender address
                to: req.body.email, // List of recipients
                subject: "Recover Your Password", // Subject line
               //// text: "", // Plain text body
               html: '<html><body><h1>Welcome To <a href="https://latestlocaldealz.com/" target="_blank">Latest Local Deals</a></h1><h2>Recover Your Password:</h2><p>Here is your Password</p> <h3>'+result.pass+'</h3><p>Here is your username</p> <h3>'+result.username+'</h3></body><br><br><br><h4>Developed by</h4><a href="https://www.encodersoft.co/" target="_blank">Encodersoft</a></html>'

               
              };

               transport.sendMail(message, function (err, info) {
                if (err) {
                  console.log(err);
               //// res5.json("Something bad happened.Please Try again");
                } else {

                  msg="email sent Successfully"
                  console.log(info);
                //// res5.send("email sent Successfully");
                }
                
              });



           res5.send("email sent Successfully");

            }
            else {
               /// res1.json("Something bad happened.Please Try again");
                console.log('no');
                res5.send("sent");
            }
          ///  res5.json(msg);
            db.close();
        });
    });


  });
};
