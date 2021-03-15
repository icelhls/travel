

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








router.post("/users/postcomments", (req, res5) => {

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },function(err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        var myobj = {comment:req.body.comment, postedid:ObjectId(req.body.postedid),
            docid: ObjectId(req.body.docid),
            date: req.body.date
        
        
        
        };
        dbo.collection("comments").insertOne(myobj, function(err, res1) {
          if (err) throw err;
          console.log("1 document inserted");
       
         
      
        
             
          dbo.collection("posts").aggregate([
              { $match : { _id : ObjectId (req.body.docid)} },
              {
              $project:{
      
      
                  comments:1
              }}
            
              ]).toArray(function(err, resdata) {
      
      ///console.log(resdata[0].likes)
      
      var myquery = {  _id :  ObjectId (req.body.docid)};
      var newvalues = { $set: {comments:resdata[0].comments+1 } };
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
 



router.post("/users/getallcomments", (req, res) => {

    var allcomments=[];
//   var checksubscribe=[];
    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allcomments= await dbo.collection('comments').aggregate([
        { $match : {docid:ObjectId(req.body.docid)
        }},
        // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
        { $lookup:
           {
             from: 'users',
             localField: 'postedid',
             foreignField: '_id',
             as: 'orderd'
           }
         },
  
        
         {   $unwind:"$orderd" }, 
  
     
    
         {   
          $project:{
            comment: 1,
      date: 1,
     
          
              uploderfname : "$orderd.fname",
              uploderpic : "$orderd.pic",
             
          } 
      }
        ]).toArray()
 
          
          
          
          
          
                  console.log(allcomments);
                  res.json(allcomments);
  
  
  
  
  
  
  
     });
    
  
  
  
  
  });








}

