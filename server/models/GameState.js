const mongoose = require('mongoose');

const GameStateSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    // state: { type: Number, required: true, default: 1 },
    savedAt: { type: Date, default: Date.now },
    playerStatus: {
        type: {
            x: { type: Number, required: true, default: 422 },
            y: { type: Number, required: true, default: 866 },
            progress: { type: Number, required: true, default: 0 }
        },
        required: true
    },

    playerStatus2: {
        type: {
            x: { type: Number, required: true, default: 422 },
            y: { type: Number, required: true, default: 866 },
            progress: { type: Number, required: true, default: 0 }
        },
        required: true
    },

    playerStatus3: {
        type: {
            x: { type: Number, required: true, default: 422 },
            y: { type: Number, required: true, default: 866 },
            progress: { type: Number, required: true, default: 0 }
        },
        required: true
    }

});

const GameState = mongoose.model('GameState', GameStateSchema);

module.exports = GameState;