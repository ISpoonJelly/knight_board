var mongoose = require("mongoose"),
  Board = mongoose.model("Board");

function saveBoard(req, res) {
  var knight = req.body.knight.toLowerCase();

  if (!knight || !validInput(knight)) {
    return res.status(400).send("Invalid knight position");
  }

  Board.create({ knight }, (err, board) => {
    if (err) {
      return res.status(500).send("[MONGO]", "Error creating board", err);
    }

    return res.status(200).send({ id: board._id, knight: board.knight });
  });
}

function validInput(input) {
  if (input.length != 2) return false;

  var column = input.charAt(0);
  if (column < "a" || column > "h") return false;

  var row = input.charAt(1);
  if (!isInteger(row)) return false;

  row = parseInt(row);
  if (row < 1 || row > 8) return false;

  return true;
}

function isInteger(string) {
  return !isNaN(parseInt(string)) && isFinite(string);
}

module.exports = {
  save_board: saveBoard
};
