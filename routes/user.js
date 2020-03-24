const express = require('express');
const router = express.Router();
const path = require('path');
const {ensureAuthenticated} = require('../config/auth');


router.get('/', ensureAuthenticated, (req,res) => {
    res.send("User log in success");
})


router.get('/request', ensureAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname, "/../client/webPages/index.html"));
})

router.post('/request', (req,res) => {
    const requestData = req.body;
    console.log(requestData);
})

module.exports = router;