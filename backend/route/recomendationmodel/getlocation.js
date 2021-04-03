

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
const spawn = require('child_process').spawn;

module.exports = function (router) {



    router.post("/getLocations", (req, res) => {
        console.log("its orginal only here kjbdsbkfsdkjbfksj")
    //     var lat=74.2227181;
    //  var long=31.4137617;
      
         var lat=parseFloat(req.body.lat);
        var long=parseFloat(req.body.long);

        // console.log(lat)
        // console.log(long)
        
      
            const process = spawn('python', ['F:/react projects/travel/backend/route/recomendationmodel/onlylocations.py',lat,long]);
         
            // collect data from script
            process.stdout.on('data',data=>{
              console.log('after process')
      
      
            try{
              
              myarray=JSON.parse(data)
              console.log(myarray)
              res.json(myarray)
            
           /////   var test=data;
            
              console.log(myarray)
            }
            catch{
                console.log('myarray')
              
            }
             
            
          
               
               
               
               ;})
               process.stderr.on('data', (data) => {
                console.log("errorrrer");
                console.log(data.toString());
            });
              
        
        })


};