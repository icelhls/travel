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







 

 

  router.post("/users/sendverifycode", async (req, res1) => {


 



MongoClient.connect(url, function (err, db) {


console.log(req.body);




    var finalcode=(Math.floor(100000 + Math.random() * 900000))

        if (err) throw err;
        var dbo = db.db("localdeals");
        var myquery = {  _id :  ObjectId (req.body.myid)};
        var newvalues = { $set: {verify:finalcode.toString() } };
      dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;

           
         
               //  console.log(result);
               const message = {
                from: "latestlocaldealz@gmail.com", // Sender address
                to: req.body.email, // List of recipients
                subject: "Verify YOur Email", // Subject line
               //// text: "", // Plain text body
               html: '<html><body><h1>Verify Email</h1><p>Put That Code in app</p> <p>code  is here  '+finalcode+'</p></body></html>'

               
              };

               transport.sendMail(message, function (err, info) {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                  res1.json("Code Has been Sent");
                }
                
              });



                

           

            db.close();
        });
    });


  });
  
  router.post("/users/verifyemail", async (req, res1) => {

    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").findOne({  _id: ObjectId (req.body.myid)}, function (err, result) {
            if (err) throw err;
            console.log(result)
            if (result != "" || result!=null || result!="null") {
               //  console.log(result);
               if(result.verify==req.body.keycode){




              
                var myquery = {  _id :  ObjectId (req.body.myid)};
                var newvalues = { $set: {verify:"yes" } };
                dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                  if (err) throw err;
                console.log("1 document updated");
                

result.verify="yes";




                console.log(result);
                res1.json(result);

                // dbo.collection("users").findOne({ _id: ObjectId (req.body.myid) }, function (err, result6) {
                //     if (err) throw err;
                //     if (result != "" || result!=null || result!="null") {
                //        //  console.log(result);
                //         res1.json(result6);
        
                //     }
                //     else {
                //         res1.json("no");
                //         console.log('no');
                //     }
        
                  
                // });






                });

               }
               else{
                res1.json("no");
               }

            }
            else {
                res1.json("no");
                console.log('no');
            }

            db.close();
        });
    });

    
      });
};
