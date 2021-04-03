const  express = require("express");
const  http = require("http");
const bodyParser = require("body-parser");
const  cors = require("cors");
const app = require('express')()
const  server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  const path = require('path');


const getlocation=require('./route/recomendationmodel/getlocation');
////const signupgoogle = require("./route/Registration/signupgoogle");

const sociallogin = require("./route/Registration/sociallogin");

const emaillogin = require("./route/Registration/enaillogin");
app.use(express.json());
const router = express.Router();
app.use(cors());
const { ExpressPeerServer } = require("peer");
const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/peer", peerServer)
getlocation(app)

sociallogin(app)
emaillogin(app)

// app.post("/loginnow", (req, res1) => {
// console.log(req.body)
// res1.json("dsfsdf")
// })

app.use(express.static(path.join(__dirname, 'build')));
app.use('*', (req, res) => {

	// res.sendFile(path.join(__dirname+'/build/index.html'));
res.json("sdad")
});



const port=process.env.PORT || 5000;
server.listen(port,()=> console.log(`server is running ${port}`))
io.on("connection", (socket) => {



})  
