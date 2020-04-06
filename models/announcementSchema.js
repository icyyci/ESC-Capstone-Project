const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema( {
    groupID: {
        type: String,
        required: true
    },

    Announcement: [{type: String}]
});

const announcementDB = mongoose.model('Announcements', announcementSchema);
module.exports = announcementDB;