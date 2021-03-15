const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));




const bodyParser = require("body-parser");


module.exports = function (router) {
 

 

  router.post("/users/signin", async (req, res1) => {
    console.log(req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").findOne({  username: (req.body.username).toLowerCase(),pass: req.body.pass}, function (err, result) {
            if (err) throw err;
         ///   console.log(result);
            if (result != null) {




              var myquery = { username: (req.body.username).toLowerCase() };
              var newvalues = { $set: {expotoken: req.body.expotoken, } };
              dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
              
              });






               //  
                res1.json(result);

            }
            else {
              dbo.collection("users").findOne({  email: req.body.username,pass: req.body.pass}, function (err, result) {
                if (err) throw err;
             ///   console.log(result);
                if (result != null) {


                  var myquery = { email: req.body.username };
                  var newvalues = { $set: {expotoken: req.body.expotoken, } };
                  dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
                    if (err) throw err;
                    console.log("1 document updated");
                  
                  });





                 
                    res1.json(result);
    
                }
                else {
    
    
                  
                    res1.json("no");
                    console.log('no');
                }
    
                ////db.close();
            });

              
            }

            ////db.close();
        });
    });


  });






  router.post("/users/websignin", async (req, res1) => {
    console.log(req.body)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").findOne({  username: (req.body.username).toLowerCase(),pass: req.body.pass}, function (err, result) {
            if (err) throw err;
         ///   console.log(result);
            if (result != null) {




          





               //  
                res1.json(result);

            }
            else {
              dbo.collection("users").findOne({  email: req.body.username,pass: req.body.pass}, function (err, result) {
                if (err) throw err;
             ///   console.log(result);
                if (result != null) {


               




                 
                    res1.json(result);
    
                }
                else {
    
    
                  
                    res1.json("no");
                    console.log('no');
                }
    
                ////db.close();
            });

              
            }

            ////db.close();
        });
    });


  });
















};
