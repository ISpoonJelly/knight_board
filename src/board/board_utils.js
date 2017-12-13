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

function findShortestPath(start, finish) {
  var solutions = [];
  var visited = [];

  var start_solution = [];
  start_solution.push(start);

  solutions.push(start_solution);
  visited.push(start);

  while (solutions.length != 0) {
    var current_solution = solutions.shift();
    var current_position = current_solution[current_solution.length - 1];

    if (
      current_position.row == finish.row &&
      current_position.column == finish.column
    ) {
      return current_solution;
    }

    for (var adjacent of getPossibleMoves(current_position)) {
      if (!isVisited(visited, adjacent)) {
        branch = [];
        branch = branch.concat(current_solution);
        branch.push(adjacent);

        visited.push(adjacent);

        solutions.push(branch);
      }
    }
  }

  return [];
}

function isVisited(list, position) {
  for (var current of list) {
    if (position.row == current.row && position.column == current.column) {
      return true;
    }
  }
  return false;
}

function getPossibleMoves(position) {
  var adjacent = [];
  for (var move of possible_knight_moves) {
    if (isValidMove(position, move.row, move.column)) {
      adjacent.push({
        row: position.row + move.row,
        column: position.column + move.column
      });
    }
  }

  return adjacent;
}

function isValidMove(position, row, column) {
  var row_move = position.row + row >= 1 && position.row + row <= 8;
  var col_move = position.column + column >= 1 && position.column + column <= 8;

  return isValidPosition(position) && row_move && col_move;
}

function isValidPosition(position) {
  return (
    position.row >= 1 &&
    position.row <= 8 &&
    position.column >= 1 &&
    position.column <= 8
  );
}

module.exports = {
  find_shortest_path: findShortestPath,
  get_possible_moves: getPossibleMoves,
  is_valid_move: isValidMove,
  is_valid_position: isValidPosition
};
