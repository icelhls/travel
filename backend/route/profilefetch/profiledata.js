

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








router.post("/users/getprofilepost", (req, res) => {







    console.log(req.body.uploderid);


    var allposts=[];
//   var checksubscribe=[];
    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('posts').aggregate([
        { $match : {uploderid:ObjectId(req.body.uploderid)}},
        { $sort : { _id : -1}},
        { $lookup:
           {
             from: 'users',
             localField: 'uploderid',
             foreignField: '_id',
             as: 'orderd'
           }
         },
  
        
         {   $unwind:"$orderd" }, 
  
     
    
         {   
          $project:{
            pname: 1,
      purl: 1,
      wprice: 1,
      nprice: 1,
      caption:1,
      filelink:1,
      uploderid:1,
      likes:1,
      comments:1,
      expiraydate:1,
  
  
  
  
            uploadtime:1,
          
              uploderfname : "$orderd.fname",
              uploderpic : "$orderd.pic",
        
             
          } 
      }
        ]).toArray()
 
          
                 ////   console.log(allposts);
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });
    
  
  
  
  
  });




  router.post("/users/getprofiledata", (req, res) => {

    console.log('1111111111111111111')
console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").findOne({ _id:ObjectId(req.body.uploderid)}, function (err, result) {
            if (err) throw err;
            console.log(result);
           res.json(result);


            db.close();
        });
    });





  })

  router.post("/users/allusersdata", (req, res) => {

console.log(req.body);
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
        dbo.collection("users").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          res.json(result)
          db.close();
        });
    });





  })




  
};