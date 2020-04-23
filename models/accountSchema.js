const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema( {
    groupNumber: {
        type: String,
        required: true
    },

    groupUserID: {
        type: String,
        required: true
    },

    groupPassword: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        default: "student"
    }

})

const account = mongoose.model('accountSchema', AccountSchema);
module.exports = account;