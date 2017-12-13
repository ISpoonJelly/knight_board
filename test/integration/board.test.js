var request = require("supertest"),
  expect = require("chai").expect,
  app = require("../../src/server");

describe("Board Configuartion Saving", function() {
  it("Fails to Save a new board configuration with empty parameters", function(done) {
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

  it("Fails to Save a new board configuration with invalid knight position", function(done) {
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

  it("Saves a new board configuration and returns its id and knight position", function(done) {
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
});

describe("Getting shortest path", function() {
    it('')
});
