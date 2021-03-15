var mongoose = require("mongoose");

var config = require("../config/config");

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var postschm = new mongoose.Schema({
  pname: String,
  purl: String,

  pcode: String,
  wprice: String,
  nprice: String,
  caption: String,
  filelink:String,
  uploderid:mongoose.ObjectId,
  likes: Number,
  comments: Number,
  uploadtime: Number,
  expiraydate: String,
   expireAt: Date,
   logEvent: Number,
   logMessage: String,
 
});
postschm.index({ "expireAt": 1 }, { expireAfterSeconds: 0 } );
var postmodel = mongoose.model("post", postschm);
module.exports = postmodel;
