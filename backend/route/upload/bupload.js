const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");




const moment = require('moment-timezone');

var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));


  var postmodel = require("../../model/postmodel");
  var myupload = postmodel.find({});


const bodyParser = require("body-parser");


var filename;

aws.config.update({
  secretAccessKey: config.secretAccessKey,
  accessKeyId: config.accessKeyId,
  region: "us-east-1",
});
s3 = new aws.S3();




  var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: "mylatestdeals",
      key: function (req, file, cb) {
        console.log(file);
        cb(
          null,
          (printname = myfilename = Date.now() + "-" + file.originalname)
        );
        filename = printname;
      },
    }),
  });






module.exports = function (router) {
 

  

  router.post("/users/uploads", upload.single("photo"), (req, res1) => {




 
  //// console.log(req.body.hours);



   var newYork    = moment.tz(req.body.hours+" 23:50", "Australia/Sydney");



console.log(newYork.format())


 //  res1.json("submitted");




    let d = new Date();
    let timestamp = d.getTime();
console.log(req.body)
    var postdetail = new postmodel({
      pname: req.body.pname,
  purl: req.body.purl,

  pcode: req.body.pcode,
  wprice: req.body.wprice,
  nprice: req.body.nprice,
  caption: req.body.caption,
  expiraydate: (req.body.expiraydate).toString(),
  filelink:"https://mylatestdeals.s3.amazonaws.com/"+filename,
  uploderid:ObjectId(req.body.uploderid),
  likes: 0,
  comments: 0,
  uploadtime: timestamp,
  expireAt:newYork.format(),
 

      
    });

    postdetail.save(function (err, res) {
      if (err) throw err;

      myupload.exec(function (err, data) {
        if (err) throw err;

        res1.json("submitted");
      });
    });
  });
 




  router.post("/users/changepic", upload.single("photo"), (req, res1) => {

    // "https://mylatestdeals.s3.amazonaws.com/"+filename
    
       






MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("localdeals");
  var myquery = { _id: ObjectId(req.body.uploderid)  };
  var newvalues = { $set: {pic: "https://mylatestdeals.s3.amazonaws.com/"+filename } };
  dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");

    res1.json("submitted");
    db.close();
  });
});









    
  });

  
};
