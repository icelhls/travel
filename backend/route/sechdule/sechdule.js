const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const config = require("../../config/config");
const nodemailer = require("nodemailer");
var schedule = require('node-schedule');
var url = config.mongoURI;
const cors = require("cors");
(aws = require("aws-sdk")),
  (multer = require("multer")),
  (multerS3 = require("multer-s3"));

var usermodel = require("../../model/modeluser");
var myuser = usermodel.find({});

const bodyParser = require("body-parser");
// aws.config.update({
//   secretAccessKey: config.secretAccessKey,
//   accessKeyId: config.accessKeyId,
//   region: "us-east-1",
// });
// s3 = new aws.S3();

module.exports = function (router) {
//    ///// console.log('Job runs every day at 5:30AM');
//     const j = schedule.scheduleJob({hour: 9, minute: 50}, () => {
//         console.log('Job runs every day at 5:30AM');
//       });

};
