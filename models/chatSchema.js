const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema( {
    chatRoom: {
        type: String,
        required: true
    },

    Messages: [{sender: {type: String}, msg: {type: String}}]
});

const chatDB = mongoose.model('chatLog', chatSchema);
module.exports = chatDB;