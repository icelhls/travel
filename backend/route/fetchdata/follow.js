

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








router.post("/users/savefollow", (req, res5) => {

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },function(err, db) {
        if (err) throw err;
        var dbo = db.db("localdeals");
       


        dbo.collection("follow").findOne({  goestoid:ObjectId (req.body.goestoid),postedid: ObjectId (req.body.postedid)}, function (err, result) {
          if (err) throw err;
       
          
          if (result == null) {
            

 var myobj = {postedid:ObjectId(req.body.postedid),
            goestoid: ObjectId(req.body.goestoid),
           
        
        
        
        };


             dbo.collection("follow").insertOne(myobj, function(err, res1) {
              if (err) throw err;
              console.log("1 document inserted");
           
             
          
            
                 
              dbo.collection("users").aggregate([
                  { $match : { _id : ObjectId (req.body.goestoid)} },
                  {
                  $project:{
          
          
                    follower:1
                  }}
                
                  ]).toArray(function(err, resdata5) {
          
          ///console.log(resdata[0].likes)
          
          var myquery = {  _id :  ObjectId (req.body.goestoid)};
          var newvalues = { $set: {follower:(resdata5[0].follower)+1 } };
          dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
          console.log("1 document updated");
           //// res5.json("done")
          });
          
                  });
           
    
    
              
                  dbo.collection("users").aggregate([
                    { $match : { _id : ObjectId (req.body.postedid)} },
                    {
                    $project:{
            
            
                        following:1
                    }}
                  
                    ]).toArray(function(err, resdata6) {
            
            ///console.log(resdata[0].likes)
            
            var myquery = {  _id :  ObjectId (req.body.postedid)};
            var newvalues = { $set: {following:(resdata6[0].following)+1 } };
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
            console.log("1 document updated");
              res5.json("done")
            });
            
                    });
             
    
    
    
              
             
            }
            )
             
          }
          else {
            dbo.collection("follow").deleteOne(myobj, function(err, res1) {
              if (err) throw err;
              console.log("1 document dell");
           
             
          
            
                 
              dbo.collection("users").aggregate([
                  { $match : { _id : ObjectId (req.body.goestoid)} },
                  {
                  $project:{
          
          
                    follower:1
                  }}
                
                  ]).toArray(function(err, resdata7) {
          
          ///console.log(resdata[0].likes)
var finalfollower=(resdata7[0].follower)-1 
                if(finalfollower<0){
        finalfollower=0;
      }
          
          var myquery = {  _id :  ObjectId (req.body.goestoid)};
          
          var newvalues = { $set: {follower:finalfollower } };
          dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
          console.log("1 document updated");
           //// res5.json("done")
          });
          
                  });
           
    
    
              
                  dbo.collection("users").aggregate([
                    { $match : { _id : ObjectId (req.body.postedid)} },
                    {
                    $project:{
            
            
                        following:1
                    }}
                  
                    ]).toArray(function(err, resdata8) {
            
         var finalfollowing=(resdata8[0].following)-1;
         if(finalfollowing<0){
           finalfollowing=0;
         }

         console.log(finalfollowing)
            
            var myquery = {  _id :  ObjectId (req.body.postedid)};
            var newvalues = { $set: {following:finalfollowing} };
            dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
            console.log("1 document updated");
            
            });
            
                    });
             
    
    
    
              
             
            }
            )
            res5.json("done")
          }
  
      
      });











    
















    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    )








   
  
      




   
  
});
 























// router.post("/users/saveunfollow", (req, res5) => {

//     MongoClient.connect(url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },function(err, db) {
//         if (err) throw err;
//         var dbo = db.db("localdeals");
        
//         var myobj = {postedid:ObjectId(req.body.postedid),
//             goestoid: ObjectId(req.body.goestoid),
           
        
        
        
//         };
//         dbo.collection("follow").deleteOne(myobj, function(err, res1) {
//           if (err) throw err;
//           console.log("1 document dell");
       
         
      
        
             
//           dbo.collection("users").aggregate([
//               { $match : { _id : ObjectId (req.body.goestoid)} },
//               {
//               $project:{
      
      
//                 follower:1
//               }}
            
//               ]).toArray(function(err, resdata9) {
      
//       ///console.log(resdata[0].likes)
//       var finalfollower=(resdata9[0].follower)-1;
//       if(finalfollower<0){
//         finalfollower=0;
//       }



      
//       var myquery = {  _id :  ObjectId (req.body.goestoid)};
//       var newvalues = { $set: {finalfollower:finalfollower} };
//       dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
//         if (err) throw err;
//       console.log("1 document updated");
//        //// res5.json("done")
//       });
      
//               });
       


          
//               dbo.collection("users").aggregate([
//                 { $match : { _id : ObjectId (req.body.postedid)} },
//                 {
//                 $project:{
        
        
//                     following:1
//                 }}
              
//                 ]).toArray(function(err, resdata) {
        
//         ///console.log(resdata[0].likes)
        
//         var myquery = {  _id :  ObjectId (req.body.postedid)};
//         var newvalues = { $set: {following:(resdata[0].following)-1 } };
//         dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
//           if (err) throw err;
//         console.log("1 document updated");
//           res5.json("done")
//         });
        
//                 });
         



          
         
//         }
//         )
    
















    
//     }
    
    
    
    
    
    
    
    
    
    
    
    
//     )








   
  
      




   
  
// });


router.post("/users/getfollow", (req, res5) => {

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("localdeals");
    dbo.collection("follow").findOne({  goestoid:ObjectId (req.body.goestoid),postedid: ObjectId (req.body.postedid)}, function (err, result) {
        if (err) throw err;

        
        if (result != null) {
          /// console.log(result);
            res5.json("yes");
            console.log('yes');
        }
        else {
            res5.json("");
            console.log('no');
        }

        db.close();
    });
});


})


router.post("/users/getlistfollower", (req, res) => {

    var allfollower=[];
//   var checksubscribe=[];
    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allfollower= await dbo.collection('follow').aggregate([
        { $match : {goestoid:ObjectId(req.body.uploderid)
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
       
     
            _id:"$orderd._id",
              fname : "$orderd.fname",
              pic : "$orderd.pic",
             
          } 
      }
        ]).toArray()
 
          
          
          
          
          
               ///   console.log(allcomments);
                  res.json(allfollower);
  
  
  
  
  
  
  
     });
    
  
  
  
  
  });

  router.post("/users/getlistfollowing", (req, res) => {

    var allfollowing=[];
//   var checksubscribe=[];
    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allfollowing= await dbo.collection('follow').aggregate([
        { $match : {postedid:ObjectId(req.body.uploderid)
        }},
        // { $sort : { plays : -1,likes : -1,share : -1,playlist:-1}},
        { $lookup:
           {
             from: 'users',
             localField: 'goestoid',
             foreignField: '_id',
             as: 'orderd'
           }
         },
  
        
         {   $unwind:"$orderd" }, 
  
     
    
         {   
          $project:{
       
     
               _id:"$orderd._id",
              fname : "$orderd.fname",
              pic : "$orderd.pic",
             
          } 
      }
        ]).toArray()
 
          
          
          
          
          
               ///   console.log(allcomments);
                  res.json(allfollowing);
  
  
  
  
  
  
  
     });
    
  
  
  
  
  });

}

