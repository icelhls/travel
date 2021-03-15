

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));

// var usermodel = require("../../model/modeluser");
// var myuser = usermodel.find({});

const bodyParser = require("body-parser");
// aws.config.update({
//   secretAccessKey: config.secretAccessKey,
//   accessKeyId: config.accessKeyId,
//   region: "us-east-1",
// });
// s3 = new aws.S3();

module.exports = function (router) {








router.post("/users/savenotificationtoken", (req, res5) => {

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },function(err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
       


        var myobj = {postedid:ObjectId(req.body.postedid),
            goestoid: ObjectId(req.body.goestoid),
            expotoken: req.body.expotoken,
        }
           


  dbo.collection("notification").insertOne(myobj, function(err, res1) {
        if (err) throw err;
              console.log("1 document inserted");
           
   
              
res5.json("submitted")

          
  })
  



            })         
                 
 





        })}

