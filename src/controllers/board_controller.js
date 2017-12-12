var mongoose = require("mongoose"),
  Board = mongoose.model("Board");

function saveBoard(req, res) {
  var knight = req.body.knight.toLowerCase();
  if (!knight) {
    return res.status(400).send({ message: "Missing input parameters" });
  }

  knight = parseInput(knight);

  if (!validInput(knight)) {
    return res.status(400).send({ message: "Invalid knight position" });
  }

  Board.create({ knight }, (err, board) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "[MONGO] Error creating board", err });
    }

    var formatted = Board.position_to_string(
      Board.string_to_position(board.knight)
    );
    return res.status(200).send({ id: board._id, knight: formatted });
  });
}

function getShortestPath(req, res) {
  var id = req.body.id;
  var target = req.body.target.toLowerCase();

  if (!id || !target) {
    return res.status(400).send({ message: "Missing input parameters" });
  }

  target = parseInput(target);

  if (!validInput(target)) {
    return res.status(400).send({ message: "Invalid target position" });
  }

  Board.findOne({ _id: id }, (err, board) => {
    var shortest = board.find_shortest_to(target);
    var path = Board.position_list_to_string(shortest);

    var start = Board.position_to_string(
      Board.string_to_position(board.knight)
    );
    res.status(200).send({ start, target, path });
  });
}

function validInput(input) {
  if (!input || input.length != 2) return false;

  var column = input.charAt(0);
  var row = input.charAt(1);

  if (!isInteger(column) || !isInteger(row)) return false;

  column = parseInt(column);
  row = parseInt(row);

  if (column < 1 || column > 8) return false;
  if (row < 1 || row > 8) return false;

  return true;
}

function isInteger(string) {
  return !isNaN(parseInt(string)) && isFinite(string);
}

function parseInput(input) {
  return (input.charCodeAt(0) - 96).toString() + input.charAt(1);
}

module.exports = {
  save_board: saveBoard,
  get_shortest_path: getShortestPath
};
