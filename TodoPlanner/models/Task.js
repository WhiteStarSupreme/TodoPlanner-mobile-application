const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    date: String,
    hour: Number,
    minute: Number,
    priority: String,
    done: Boolean
});

module.exports = mongoose.model('Task', TaskSchema);
