var mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    knight: {
        type: String,
        required: true
    }
});

let Board = mongoose.model('Board', boardSchema);
module.exports = Board;