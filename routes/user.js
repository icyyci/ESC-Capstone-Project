const express = require('express');
const router = express.Router();
const path = require('path');
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');


router.get('/', ensureAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname, "/../client/WebPages/userPage.html"));
})

router.post('/', (req,res) => {
    console.log(req.body)
    if (req.body.request == "firstload") {
        const requestDB = require("../models/requestSchema");
        requestDB.findOne({groupNumber: req.user.groupUserID}).then(gr => {
            console.log(gr);
            res.send(gr);
        });
    }
});



router.get('/request', ensureAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname, "/../client/WebPages/index.html"));
})

router.post('/request', (req,res) => {
    var requestData = req.body;
    console.log(requestData);
    var requestDB = require('../models/requestSchema');
    var groupRequestDB;
    requestDB.findOne({groupNumber: req.user.groupUserID}).then(gr => {
        if (gr) {
            groupRequestDB = gr;
            groupRequestDB.groupRequest = requestData;
            groupRequestDB.save();          
        }
        else {
            const newGroupRequest = new requestDB({
                groupNumber: req.user.groupUserID,
                groupRequest: requestData
            });
            newGroupRequest.save();
        }
    })
})

module.exports = router;