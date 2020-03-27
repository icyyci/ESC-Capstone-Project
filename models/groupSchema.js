const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema( {
    owner: {
        type: String
    },
    groups: [{type: String}]
});

const groupDB = mongoose.model('grouplist', groupSchema);
module.exports = groupDB;