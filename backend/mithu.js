const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = require("express")();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const path = require("path");

app.use(express.json());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(path.join(__dirname, "build")));
app.use("*", (req, res) => {
  // res.sendFile(path.join(__dirname+'/build/index.html'));
  res.json("sdad");
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`server is running ${port}`));
io.on("connection", socket => {});
