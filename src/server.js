var express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

var config = require("./config");

var board_schema = require("./models/board");
var board_controller = require("./controllers/board_controller");

var app = express();
var server;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/board/set_board", board_controller.save_board);
app.post("/board/get_shortest_path", board_controller.get_shortest_path);

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.uri, config.mongodb.options).then(
  () => {
    console.log(
      "[MONGO]",
      "Successfully connected to MongoDB database:",
      config.mongodb.uri
    );
  },
  err => {
    console.log("[MONGO] %s", err);
    process.exit();
  }
);

if (!module.parent) {
  server = http.createServer(app);
  server.listen(config.express.port, config.express.hostname);

  server.on("listening", () => {
    var addr = server.address();
    console.log(
      "[HTTP]",
      "Server is running, listening on",
      addr.address + ":" + addr.port
    );
  });

  server.on("error", err => {
    console.log("[HTTP] %s", err);
    process.exit();
  });
}
