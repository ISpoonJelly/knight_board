var request = require("supertest"),
  co = require("co"),
  expect = require("chai").expect,
  app = require("../../src/server"),
  Board = require("mongoose").model("Board");

describe("Board Configuartion", function() {
  it("should fail to create a new board configuration with empty parameters", function(done) {
    request(app)
      .post("/board/set_board")
      .send({})
      .expect(
        400,
        {
          message: "missing input parameters"
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
          message: "invalid knight position"
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

describe("Board's Shortest Path", function() {
  it("should fail getting a path with missing parameters", function(done) {
    request(app)
      .post("/board/get_shortest_path")
      .send({})
      .expect(
        400,
        {
          message: "missing input parameters"
        },
        done
      );
  });

  it("should fail getting a path for an invalid board", function(done) {
    request(app)
      .post("/board/get_shortest_path")
      .send({ id: "hello", target: "h1" })
      .expect(
        400,
        {
          message: "board not found"
        },
        done
      );
  });

  it("should fail getting a path for an invalid target", function(done) {
    var id = "";
    before(function() {
      request(app)
        .post("/board/set_board")
        .send({ knight: "H1" })
        .end(function(err, res) {
          id = res.body.id;
        });
    });

    request(app)
      .post("/board/get_shortest_path")
      .send({ id, target: "hello" })
      .expect(
        400,
        {
          message: "missing input parameters"
        },
        done
      );
  });

  it("should get a path of length 5 for an adjacent target", function(done) {
    request(app)
      .post("/board/set_board")
      .send({ knight: "H1" })
      .end(function(err, res) {
        request(app)
          .post("/board/get_shortest_path")
          .send({ id: res.body.id, target: "G2" })
          .expect(200)
          .expect(function(res) {
            expect(res.body)
              .to.have.property("path")
              .to.be.an("array")
              .and.have.lengthOf(5);
          })
          .end(done);
      });
  });

  it("should get a path of length 7 for moving from one edge of the board to an opposite one", function(done) {
    request(app)
      .post("/board/set_board")
      .send({ knight: "a1" })
      .end(function(err, res) {
        request(app)
          .post("/board/get_shortest_path")
          .send({ id: res.body.id, target: "h8" })
          .expect(200)
          .expect(function(res) {
            expect(res.body)
              .to.have.property("path")
              .to.be.an("array")
              .and.have.lengthOf(7);
          })
          .end(done);
      });
  });
});
