var mongoose = require("mongoose"),
  Board = mongoose.model("Board");

function saveBoard(req, res) {
  var knight = req.body.knight.toLowerCase();

  if (!Board.validPosition(knight)) {
    return res.status(400).send("Invalid knight position");
  }

  knight = Board.normalizeInput(knight);

  Board.create({ knight }, (err, board) => {
    if (err) {
      return res.status(500).send("[MONGO]", "Error creating board", err);
    }

    return res.status(200).send({ id: board._id, knight: board.knight });
  });
}

module.exports = {
  save_board: saveBoard
};
