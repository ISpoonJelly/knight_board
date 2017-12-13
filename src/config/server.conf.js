let PORT = process.env.PORT || 3000;
let MONGO_HOST = process.env.MONGO_HOST || "localhost";

module.exports = {
  express: {
    port: PORT
  },

  mongodb: {
    uri: "mongodb://" + MONGO_HOST + "/board",
    options: {
      useMongoClient: true
    }
  }
};
