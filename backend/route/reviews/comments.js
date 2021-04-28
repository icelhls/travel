const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
var url = config.mongoURI;
var dbnmae = config.dbnmae;

module.exports = function (router) {
  router.post("/postComments", (req, res) => {
    console.log(req.body);
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(dbnmae);

      var myobj = {
        uploderid: ObjectId(req.body.uploderid),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        comment: req.body.comment,
        date: new Date(Date.now()).toISOString(),
      };
      dbo.collection("comments").insertOne(myobj, function (err, res) {
        if (err) throw err;
        ////console.log("1 document inserted");
        /// res1.json("Request For Approvel Has been  Sent");
        /// db.close();
      });
    });
  });

  router.post("/fetchComments", (req, res) => {
    console.log(req.body);
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
          .collection("comments")
          .aggregate([
            {
              $match: {
                latitude: req.body.latitude,
                longitude: req.body.longitude,
              },
            },

            {
              $lookup: {
                from: "users",
                localField: "uploderid",
                foreignField: "_id",
                as: "users",
              },
            },

            { $unwind: "$users" },
          ])
          .toArray();
        console.log(allposts);
        res.json(allposts);
      }
    );
  });
};
