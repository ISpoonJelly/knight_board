var expect = require("chai").expect;

var boardModel = require("../../src/board/board_model");
var boardController = require("../../src/board/board_controller");

describe("Board Controller", function() {
  describe("Checking Valid Integers", function() {
    it("should return true for checking if a number is integer", function() {
      expect(boardController.is_integer("10")).to.be.equal(true);
    });

    it("should return false for checking if a fraction is integer", function() {
      expect(boardController.is_integer("3.141592")).to.be.equal(false);
    });

    it("should return false for checking if a string is integer", function() {
      expect(boardController.is_integer("hello")).to.be.equal(false);
    });
  });

  describe("Checking Valid Input", function() {
    it("should return true for a board position", function() {
      expect(boardController.is_valid_input("11")).to.be.equal(true);
      expect(boardController.is_valid_input("88")).to.be.equal(true);
      expect(boardController.is_valid_input("44")).to.be.equal(true);
    });

    it("should return false for a non board position", function() {
      expect(boardController.is_valid_input("19")).to.be.equal(false);

      expect(boardController.is_valid_input("3.141592")).to.be.equal(false);
      expect(boardController.is_valid_input("hello")).to.be.equal(false);
    });
  });

  describe("Parsing Input", function() {
    it("should return input parsed from chess notation to numeric notation", function() {
      expect(boardController.parse_input("a1")).to.be.equal("11");
      expect(boardController.parse_input("c3")).to.be.equal("33");
      expect(boardController.parse_input("h2")).to.be.equal("82");
    });
  });
});
