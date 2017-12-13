let PORT = process.env.PORT || 3000;
let MONGO_URI = process.env.MONGO_URI || "localhost";

module.exports = {
  express: {
    port: PORT
  },

  mongodb: {
    uri: "mongodb://" + MONGO_URI + "/board",
    options: {
      useMongoClient: true
    }
  }
};
