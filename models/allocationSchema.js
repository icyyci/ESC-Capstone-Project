const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema( {
    Group: {
        type: String,
        required: true
    },
    
    x: {
        type: Number,
        required: true
    },

    y: {
        type: Number,
        required: true
    },

    width: {
        type: Number,
        required: true
    },

    height: {
        type: Number,
        required: true
    }

});




const allocationDB = mongoose.model('allocation', allocationSchema);
module.exports = allocationDB;