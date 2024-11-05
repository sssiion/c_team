const mongoose = require('mongoose');

const GameStateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    state: { type: Object, required: true, default: {} },
    savedAt: { type: Date, default: Date.now },
});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = GameState;
