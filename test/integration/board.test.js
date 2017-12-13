var request = require("supertest"),
  co = require("co"),
  expect = require("chai").expect,
  app = require("../../src/server"),
  Board = require("mongoose").model("Board");

describe("Board Configuartion Saving", function() {
  it("should fail to create a new board configuration with empty parameters", function(done) {
    request(app)
      .post("/board/set_board")
      .send({})
      .expect(
        400,
        {
          message: "Missing input parameters"
        },
        done
      );
  });

  it("should fail to create a new board configuration with invalid knight position", function(done) {
    request(app)
      .post("/board/set_board")
      .send({ knight: "hello" })
      .expect(
        400,
        {
          message: "Invalid knight position"
        },
        done
      );
  });

  it("should create a new board configuration and return its id and knight position", function(done) {
    request(app)
      .post("/board/set_board")
      .send({ knight: "H1" })
      .expect(200)
      .expect(function(res) {
        expect(res.body)
          .to.have.property("id")
          .that.is.a("string").that.is.not.empty;
        expect(res.body)
          .to.have.property("knight")
          .that.is.a("string")
          .that.has.lengthOf(2);
      })
      .end(done);
  });

  it("should create a new board configuration and saves its data in the database", function(done) {
    request(app)
      .post("/board/set_board")
      .send({ knight: "h1" })
      .expect(200)
      .end(function(err, res) {
        expect(res.body)
          .to.have.property("id")
          .that.is.a("string").that.is.not.empty;
        co(function*() {
          var found = yield Board.findOne({ _id: res.body.id });
          expect(found._id.toString()).to.equal(res.body.id);
        }).then(done, done);
      });
  });
});

describe("Getting shortest path", function() {
  it("");
});
