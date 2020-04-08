const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const path = require('path');
const mongoose = require('mongoose');
const allocationDB = require('../models/allocationSchema');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/WebPages/groupallocation.html"));
})

router.post('/', (req,res) => {
    if (req.body.request == "firstload") {
       allocationDB.find({}).then(all => {
           //console.log(all);
           res.send(all);
       }) 
    }
})





module.exports = router;