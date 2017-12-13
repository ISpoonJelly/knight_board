module.exports = {
  express: {
    port: 3000,
    hostname: "127.0.0.1"
  },

  mongodb: {
    uri: "mongodb://localhost/board",
    options: {
      useMongoClient: true
    }
  }
};
