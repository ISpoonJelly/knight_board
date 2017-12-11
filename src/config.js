var PORT = process.env.PORT || 3000;
var MONGO_HOST = process.env.mongodb || "localhost";

module.exports = {
  express: {
    port: PORT,
    hostname: "127.0.0.1"
  },

  mongodb: {
    uri: "mongodb://" + MONGO_HOST + "/board",
    options: {
      useMongoClient: true
    }
  }
};
