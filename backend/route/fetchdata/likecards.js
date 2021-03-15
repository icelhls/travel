

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








router.post("/users/postlikes", (req, res5) => {


  console.log(req.body);
    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },function(err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        var myobj = {postedid:ObjectId(req.body.postedid),
            docid: ObjectId(req.body.docid),
           
        
        
        
        };
        dbo.collection("likes").insertOne(myobj, function(err, res1) {
          if (err) throw err;
          console.log("1 document inserted");
       
         
      
        
             
          dbo.collection("posts").aggregate([
              { $match : { _id : ObjectId (req.body.docid)} },
              {
              $project:{
      
      
                  likes:1
              }}
            
              ]).toArray(function(err, resdata) {
      
      ///console.log(resdata[0].likes)
      
      var myquery = {  _id :  ObjectId (req.body.docid)};
      var newvalues = { $set: {likes:resdata[0].likes+1 } };
      dbo.collection("posts").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
      console.log("1 document updated");
        res5.json("done")
      });
      
              });
       


          




          
         
        }
        )
    
















    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    )








   
  
      




   
  
});
 





router.post("/users/getlike", (req, res5) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("localdeals");
    dbo.collection("likes").findOne({  docid:ObjectId (req.body.docid),postedid: ObjectId (req.body.postedid)}, function (err, result) {
        if (err) throw err;
        if (result != null) {
           console.log(result);
            res5.json("yes");
            console.log('yes');
        }
        else {
            res5.json("no");
            console.log('no');
        }

        db.close();
    });
});


})



}

