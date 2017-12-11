let possible_knight_moves = [
  { row: 1, column: 2 },
  { row: -1, column: 2 },
  { row: 1, column: -2 },
  { row: -1, column: -2 },
  { row: 2, column: 1 },
  { row: -2, column: 1 },
  { row: 2, column: -1 },
  { row: -2, column: -1 }
];

function find_shortest_path(start, finish) {
  var queue = [];
  var visited = [];

  var start_solution = [];
  start_solution.push(start);

  queue.push(start_solution);
  visited.push(start);

  while (queue.length != 0) {
    var current_solution = queue.shift();
    var current_square = current_solution[current_solution.length - 1];

    if (
      current_square.row == finish.row &&
      current_square.column == finish.column
    ) {
      return current_solution;
    }

    for (var adjacent of get_possible_moves(current_square)) {

    }
  }
}

function get_possible_moves(square) {
  var adjacent = [];
  for (var move of possible_knight_moves) {
    if (is_valid_move(square, move.row, move.column)) {
      adjacent.push({ row: square.row + move.row, column: square.column + move.column });
    }
  }

  return adjacent;
}

function is_valid_move(square, row, column) {
  var row_move = square.row + row >= 1 && square.row + row <= 8;
  var column_move = square.column + column >= 1 && square.column + column <= 8;

  return row_move && column_move;
}

module.exports = {
  find_shortest_path,
  get_possible_moves,
  is_valid_move
};
