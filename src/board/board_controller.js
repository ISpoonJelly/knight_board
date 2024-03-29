var mongoose = require("mongoose"),
  Board = mongoose.model("Board");

function saveBoard(req, res) {
  var knight = req.body.knight;
  if (!knight) {
    return res.status(400).send({ message: "missing input parameters" });
  }

  knight = parseInput(knight.toLowerCase());

  if (!isValidInput(knight)) {
    return res.status(400).send({ message: "invalid knight position" });
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
  var target = req.body.target;

  if (!id || !target) {
    return res.status(400).send({ message: "missing input parameters" });
  }

  target = parseInput(target.toLowerCase());

  if (!isValidInput(target)) {
    return res.status(400).send({ message: "invalid target position" });
  }

  Board.findOne({ _id: id }, (err, board) => {
    if (err) {
      //TODO: handle different db errors
      return res.status(400).send({ message: "board not found" });
    }

    var path = board.find_shortest_to(target);
    var pathStr = Board.position_list_to_string_list(path);

    res.status(200).send({ path: pathStr });
  });
}

function isValidInput(input) {
  if (!input || input.length != 2) return false;

  var column = input.charAt(0);
  var row = input.charAt(1);

  if (!isIntegerStr(column) || !isIntegerStr(row)) return false;

  column = parseInt(column);
  row = parseInt(row);

  if (column < 1 || column > 8) return false;
  if (row < 1 || row > 8) return false;

  return true;
}

function isIntegerStr(string) {
  for (var char of string.split("")) {
    if (isNaN(parseInt(char))) {
      return false;
    }
  }

  return true;
}

function parseInput(input) {
  return (input.charCodeAt(0) - 96).toString() + input.charAt(1);
}

module.exports = {
  save_board: saveBoard,
  get_shortest_path: getShortestPath,
  is_integer: isIntegerStr,
  is_valid_input: isValidInput,
  parse_input: parseInput
};
