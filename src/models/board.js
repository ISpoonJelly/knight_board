var mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  knight: {
    type: String,
    required: true
  }
});

boardSchema.methods.findShortestTo = function(finalPos) {
    if(!validPosition(finalPos)) {
        return false;
    }

    
};

function validPosition(position) {
  if (!position || position.length != 2) return false;

  var column = position.charCodeAt(0) - 96;
  if (column < 1 || column > 8) return false;

  var row = position.charAt(1);
  if (!isInteger(row)) return false;

  row = parseInt(row);
  if (row < 1 || row > 8) return false;

  return true;
}

function normalizeInput(position) {
    return (position.charCodeAt(0) - 96).toString() + position.charAt(1);
}

function isInteger(string) {
  return !isNaN(parseInt(string)) && isFinite(string);
}

boardSchema.statics.validPosition = validPosition;
boardSchema.statics.normalizeInput = normalizeInput;

let Board = mongoose.model("Board", boardSchema);
module.exports = Board;
