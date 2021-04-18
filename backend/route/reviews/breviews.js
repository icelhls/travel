const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
var dbnmae = config.dbnmae;

module.exports = function (router) {
  router.post("/postReview", (req, res) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbnmae);

      dbo.collection("rating").findOne(
        {
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          uploderid: ObjectId(req.body.uploderid),
        },
        function (err, result) {
          console.log("----------------");
          console.log(result);
          console.log("----------------");
          if (result != null) {
            dbo.collection("rating").updateOne(
              {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                uploderid: ObjectId(req.body.uploderid),
              },
              {
                $set: {
                  rating: req.body.rating,
                  date: new Date(Date.now()).toISOString(),
                },
              },
              function (err, res) {
                if (err) throw err;
                ////console.log("1 document updated");

                //////  db.close();
                /// res1.json("Request For Approvel Has been Again Sent");
              }
            );
          } else {
            var myobj = {
              uploderid: ObjectId(req.body.uploderid),
              latitude: req.body.latitude,
              longitude: req.body.longitude,
              rating: req.body.rating,
              date: new Date(Date.now()).toISOString(),
            };
            dbo.collection("rating").insertOne(myobj, function (err, res) {
              if (err) throw err;
              ////console.log("1 document inserted");
              /// res1.json("Request For Approvel Has been  Sent");
              /// db.close();
            });
          }
        }
      );
    });
  });

  router.post("/fetchReviews", (req, res) => {
    var allposts = [];

    MongoClient.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async function (err, db) {
        if (err) throw err;
        const dbo = db.db(dbnmae);
        /*Return only the documents with the address "Park Lane 38":*/
        var query = {};

        allposts = await dbo
          .collection("rating")
          .aggregate([
            {
              $match: {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
              },
            },
            //  { $sort : { _id : -1}},
            {
              $group: {
                _id: {
                  latitude: "$latitude",
                  longitude: "$longitude",
                },
                averagerating: {
                  $avg: "$rating",
                },
              },
            },
          ])
          .toArray();
        console.log(allposts);
        res.json(allposts);
      }
    );
  });
};
