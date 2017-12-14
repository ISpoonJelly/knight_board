var express = require("express"),
  http = require("http"),
  helmet = require("helmet"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

var envConfig = require("./config/server.conf");

var board = require("./board/index");

var app = express();
var server;

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TODO: have a route module for board
app.post("/board/set_board", board.controller.save_board);
app.post("/board/get_shortest_path", board.controller.get_shortest_path);

mongoose.Promise = global.Promise;
mongoose.connect(envConfig.mongodb.uri, envConfig.mongodb.options).then(
  () => {},
  err => {
    console.log("[MONGO] %s", err);
    process.exit();
  }
);

if (!module.parent) {
  server = http.createServer(app);
  server.listen(envConfig.express.port);

  server.on("listening", () => {
    var addr = server.address();
    console.log("[HTTP]", "Server is running, listening on port ", addr.port);
  });

  server.on("error", err => {
    console.log("[HTTP] %s", err);
    process.exit();
  });
}

module.exports = app;
