var mongoose = require("mongoose");

var utils = require("../utils/board_utils");

var BoardSchema = new mongoose.Schema({
  knight: {
    type: String,
    required: true
  }
});

BoardSchema.statics.position_to_string = positionToString;
BoardSchema.statics.position_list_to_string = positionListToString;
BoardSchema.statics.string_to_position = stringToPosition;
BoardSchema.methods.find_shortest_to = findShortestTo;

function findShortestTo (finalPos) {
  var start = stringToPosition(this.knight);
  var target = stringToPosition(finalPos);

  return utils.find_shortest_path(start, target);
};

function stringToPosition(input) {
  return { row: parseInt(input.charAt(0)), column: parseInt(input.charAt(1)) };
}

function positionToString(position) {
  var letter = String.fromCharCode(96 + position.row);
  return letter + position.column;
}

function positionListToString(list) {
  var result = [];
  if (!list) return result;

  for (var item of list) {
    result.push(positionToString(item));
  }
  return result;
}

let Board = mongoose.model("Board", BoardSchema);
module.exports = Board;
