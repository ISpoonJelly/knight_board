let POSSIBLE_KNIGHT_MOVES = [
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
  var visitedPositions = [];

  var startSolution = [];
  startSolution.push(start);

  solutions.push(startSolution);
  visitedPositions.push(start);

  while (solutions.length != 0) {
    var currentSolution = solutions.shift();
    var currentPosition = currentSolution[currentSolution.length - 1];

    if (
      currentPosition.row == finish.row &&
      currentPosition.column == finish.column
    ) {
      return currentSolution;
    }

    for (var adjacent of getPossibleMoves(currentPosition)) {
      if (!isVisited(visitedPositions, adjacent)) {
        branch = [];
        branch = branch.concat(currentSolution);
        branch.push(adjacent);

        visitedPositions.push(adjacent);

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
  for (var move of POSSIBLE_KNIGHT_MOVES) {
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
  var rowMove = position.row + row >= 1 && position.row + row <= 8;
  var colMove = position.column + column >= 1 && position.column + column <= 8;

  return isValidPosition(position) && rowMove && colMove;
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
