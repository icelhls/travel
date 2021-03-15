

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














  router.post("/users/getcardbyall", (req, res) => {

    console.log(req.body);
      var allposts=[];
    
        
        MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },async function(err, db) {
          if (err) throw err;
          var dbo = db.db("localdeals");
          /*Return only the documents with the address "Park Lane 38":*/
          var query = {};
      
          allposts= await dbo.collection('posts').aggregate([


            { $match : {pname:{ $regex: req.body.pname ,'$options' : 'ix'}}},




      
            // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
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
                pcode:1,
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
     
              console.log(allposts);
                        res.json(allposts);
        
         });

    
    
    
      
      });




















router.post("/users/getcardbyproduct", (req, res) => {

console.log(req.body);

if(req.body.byproduct=='true'){






    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('posts').aggregate([
        { $match : {pname:{ $regex: req.body.searchword,'$options' : 'i' }}},
        // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
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
      pcode:1,
  
  
      expiraydate:1,
  
            uploadtime:1,
          
              uploderfname : "$orderd.fname",
              uploderpic : "$orderd.pic",
             
          } 
      }
        ]).toArray()
 
          console.log(allposts);
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });
    
  
  
    }


if(req.body.bypcode=='true'){





    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('posts').aggregate([
        { $match : {pcode:{ $regex: req.body.searchword ,'$options' : 'i'}}},
        // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
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
      pcode:1,
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
        console.log(allposts);
          
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });




}












  
  });

  router.post("/users/getprofilelist", (req, res) => {

    console.log(req.body);
    
   
    
    
    
    
    
    
        var allusers=[];
    
        
        MongoClient.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },async function(err, db) {
          if (err) throw err;
          var dbo = db.db("localdeals");
          /*Return only the documents with the address "Park Lane 38":*/
          var query = {};
      
          allusers= await dbo.collection('users').aggregate([
            // { $match : {$or: [username:{ $regex: req.body.searchword }} ,    {username:{ $regex: req.body.searchword }      ]}},


            { $match: { $or: [ { fname: { $regex: (req.body.searchword).toLowerCase() ,'$options' : 'i' }},   { lname: { $regex: (req.body.searchword).toLowerCase() ,'$options' : 'i' }} ,{ username: { $regex: (req.body.searchword).toLowerCase() ,'$options' : 'i' }}    ] } },




            // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
            {   
                $project:{
             
           
                     _id:1,
                    fname :1,
                    pic : 1,
                   
                } 
            }
            ]).toArray()
     
              console.log(allusers);
                        res.json(allusers);
        
        
        
    
    
              
              
              
              
      
      
      
      
      
      
         });
        
      
      
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
      
      });
    
};