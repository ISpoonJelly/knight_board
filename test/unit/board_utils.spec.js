var expect = require("chai").expect;

var boardUtils = require("../../src/board/board_utils");

describe("Board Utils", function() {
  describe("Checking Valid Positions", function() {
    it("should return false for any value below 1", function() {
      var board_position;

      board_position = { row: 0, column: 1 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);

      board_position = { row: 1, column: 0 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);

      board_position = { row: 0, column: 0 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);

      board_position = { row: -10, column: 7 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);
    });

    it("should return false for any value above 8", function() {
      var board_position;

      board_position = { row: 9, column: 9 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);

      board_position = { row: 1000, column: 10 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);

      board_position = { row: 5, column: 50 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);
    });

    it("should return false if row is missing", function() {
      var board_position;

      board_position = { column: 9 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);
    });

    it("should return false if column is missing", function() {
      var board_position;

      board_position = { row: 9 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(false);
    });

    it("should return true if column and row are present, <=8 and >=1", function() {
      var board_position;

      board_position = { row: 4, column: 6 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(true);

      board_position = { row: 6, column: 2 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(true);

      board_position = { row: 1, column: 1 };
      expect(boardUtils.is_valid_position(board_position)).to.equal(true);
    });
  });

  describe("Checking Valid Moves", function() {
    it("should return false for invalid positions", function() {
      var board_position;

      board_position = { row: 0, column: 0 };
      expect(boardUtils.is_valid_move(board_position, 0, 0)).to.equal(false);
    });

    it("should return true for moving to the same position", function() {
      var board_position;

      board_position = { row: 1, column: 1 };
      expect(boardUtils.is_valid_move(board_position, 0, 0)).to.equal(true);

      board_position = { row: 8, column: 8 };
      expect(boardUtils.is_valid_move(board_position, 0, 0)).to.equal(true);
    });

    it("should return false for a move that would would result outside the board", function() {
      var board_position;

      board_position = { row: 1, column: 1 };
      expect(boardUtils.is_valid_move(board_position, -1, 0)).to.equal(false);

      board_position = { row: 1, column: 1 };
      expect(boardUtils.is_valid_move(board_position, 8, 0)).to.equal(false);

      board_position = { row: 8, column: 1 };
      expect(boardUtils.is_valid_move(board_position, -9, 0)).to.equal(false);

      board_position = { row: 8, column: 8 };
      expect(boardUtils.is_valid_move(board_position, 1, 1)).to.equal(false);
    });
  });

  describe("Getting Possible Board Moves", function() {
    it("should return empty array for an invalid position", function() {
      var board_position;

      board_position = { row: 0, column: 0 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        0
      );

      board_position = { row: 9, column: 9 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        0
      );

      board_position = { row: 1 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        0
      );

      board_position = { column: 1 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        0
      );

      board_position = {};
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        0
      );
    });

    it("should return 2 moves for a corner position", function() {
      var board_position;
      board_position = { row: 1, column: 1 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        2
      );

      board_position = { row: 1, column: 8 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        2
      );

      board_position = { row: 8, column: 1 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        2
      );

      board_position = { row: 8, column: 8 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        2
      );
    });

    it("should get 8 moves for any position away from the walls by atleast 2 blocks", function() {
      var board_position;

      board_position = { row: 3, column: 3 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        8
      );

      board_position = { row: 3, column: 6 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        8
      );

      board_position = { row: 6, column: 3 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        8
      );

      board_position = { row: 6, column: 6 };
      expect(boardUtils.get_possible_moves(board_position)).to.have.lengthOf(
        8
      );
    });
  });
  describe("Getting Shortest Path", function() {
    it("should return list containing only the starting position for moving to the same position", function() {
      var board_position;
      board_position = { row: 1, column: 1 };

      expect(boardUtils.find_shortest_path(board_position, board_position))
        .to.have.lengthOf(1)
        .and.deep.include(board_position);
    });

    it("should return a list of length 5 for adjacent target positions", function() {
      var board_position;
      board_position = { row: 8, column: 1 };

      var final_position;
      final_position = { row: 7, column: 2 };

      expect(
        boardUtils.find_shortest_path(board_position, final_position)
      ).to.have.lengthOf(5);
    });

    it("should return a list of length 7 to move from one edge of the board to the opposite adjacent edge", function() {
      var board_position;
      board_position = { row: 1, column: 1 };

      var final_position;
      final_position = { row: 8, column: 8 };

      expect(
        boardUtils.find_shortest_path(board_position, final_position)
      ).to.have.lengthOf(7);
    });
  });
});
