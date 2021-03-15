

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
  router.post("/users/maintainbucket", (req, res) => {


    if(req.body.pname!="" && req.body.pcode!=""){
      onlypcode();
      onlypname();
      bothsearch();

    }
else if(req.body.pname=="" && req.body.pcode!=""){
  onlypcode();
}
else{
  onlypname();
}
    // MongoClient.connect(url, function(err, db) {
    //   if (err) throw err;
    //   var dbo = db.db("localdeals");
    //   var myquery = { address: "Valley 345" };
    //   var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };
    //   dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document updated");
    //     db.close();
    //   });
    // });


    function onlypname(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      dbo.collection("pnamesearch").findOne({pname:req.body.pname}, function(err, result) {
        if (err) throw err;
  
      if(result==null ){

        var myobj = { pname:req.body.pname, quantity: 1 };
        dbo.collection("pnamesearch").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");


      })}

      else{

      var myquery = { pname:req.body.pname };
      var newvalues = { $set: {quantity: result.quantity+1} };
      dbo.collection("pnamesearch").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
       
      });




      }
       
      });
    });
  }



  function onlypcode(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      dbo.collection("pcodesearch").findOne({pcode:req.body.pcode}, function(err, result) {
        if (err) throw err;
  
      if(result==null ){

        var myobj = { pcode:req.body.pcode, quantity: 1 };
        dbo.collection("pcodesearch").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");


      })}

      else{

      var myquery = { pcode:req.body.pcode };
      var newvalues = { $set: {quantity: result.quantity+1} };
      dbo.collection("pcodesearch").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
       
      });




      }
       
      });
    });
  }



  function bothsearch(){
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      dbo.collection("bothsearch").findOne({pname:req.body.pname,pcode:req.body.pcode}, function(err, result) {
        if (err) throw err;
  
      if(result==null ){

        var myobj = { pname:req.body.pname, pcode:req.body.pcode,quantity: 1 };
        dbo.collection("bothsearch").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");


      })}

      else{

      var myquery = { pname:req.body.pname, pcode:req.body.pcode };
      var newvalues = { $set: {quantity: result.quantity+1} };
      dbo.collection("bothsearch").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
       
      });




      }
       
      });
    });
  }




  })




  router.post("/users/trackpcode", (req, res) => {


    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('pcodesearch').aggregate([
       /// { $match : {pname:{ $regex: req.body.searchword,'$options' : 'i' }}},
       { $sort : { quantity : -1,}},
      
  
      
     
      {   
          $project:{
        
            pcode: 1,
            quantity: 1,
     
          } 
      }
        ]).toArray()
 
          console.log(allposts);
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });



  })




  router.post("/users/trackpname", (req, res) => {


    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('pnamesearch').aggregate([
       /// { $match : {pname:{ $regex: req.body.searchword,'$options' : 'i' }}},
       { $sort : { quantity : -1,}},
      
  
      
     
      {   
          $project:{
        
            pname: 1,
            quantity: 1,
     
          } 
      }
        ]).toArray()
 
          console.log(allposts);
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });



  })





  router.post("/users/trackboth", (req, res) => {


    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
      var query = {};
  
      allposts= await dbo.collection('bothsearch').aggregate([
       /// { $match : {pname:{ $regex: req.body.searchword,'$options' : 'i' }}},
       { $sort : { quantity : -1,}},
      
  
      
     
      {   
          $project:{
         pcode:1,
            pname: 1,
            quantity: 1,
     
          } 
      }
        ]).toArray()
 
          console.log(allposts);
                    res.json(allposts);
    
    
    


          
          
          
          
  
  
  
  
  
  
     });



  })



  router.post("/users/countusers", (req, res) => {


    var allposts=[];

    
    MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },async function(err, db) {
      if (err) throw err;
      var dbo = db.db("localdeals");
      /*Return only the documents with the address "Park Lane 38":*/
  
      dbo.collection('users').count({}, function(error, numOfDocs){
     res.json(numOfDocs)
    });

     });



  })












    
};