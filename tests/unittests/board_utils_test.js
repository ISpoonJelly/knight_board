var chai = require('chai');
var expect = chai.expect;

var board_utils = require('../../src/utils/board_utils');

describe('Board Utils', function() {
    describe('Getting Possible Board Moves', function() {
        it('should return 2 moves for a corner position', function() {
            var board_position;
            board_position = { row: 1, column: 1 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(2);

            board_position = { row: 1, column: 8 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(2);

            board_position = { row: 8, column: 1 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(2);

            board_position = { row: 8, column: 8 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(2);
        })

        
        it('should get 8 moves for any position away from the walls by atleast 2 blocks', function() {
            var board_position;
            
            board_position = { row: 3, column: 3 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(8);
            
            
            board_position = { row: 3, column: 6 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(8);
            
            
            board_position = { row: 6, column: 3 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(8);
            
            
            board_position = { row: 6, column: 6 };
            expect(board_utils.get_possible_moves(board_position)).to.have.lengthOf(8);
        })
        //TODO: add more tests for side positoins returning 4 and 6 positions
    })
})