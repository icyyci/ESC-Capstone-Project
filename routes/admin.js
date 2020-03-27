const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const path = require('path');
const mongoose = require('mongoose');

//Account Model
const account = require('../models/accountSchema');
const groupDB = require('../models/groupSchema');

router.get('/', ensureAuthenticated, (req, res) => {
    if(req.user.Role == "admin") {
        // groupDB.find({owner:"admin"}).then( grpArray => {
        //     console.log(grpArray);
        //     console.log(grpArray[0].groups);
        //     res.send(grpArray.groups);
        // })
        res.sendFile(path.join(__dirname, "/../client/WebPages/adminPage.html"));

    }
    else {
        res.redirect('/user');
    }
});

router.post('/', (req,res) => {
    console.log(req.body);
    if (req.body.request == "data") {
        const requestDB = require("../models/requestSchema");
        requestDB.findOne({groupNumber: req.body.group}).then(gr => {
            console.log(gr.groupRequest);
            res.send(gr.groupRequest);
        })
    }
    else if(req.body.request == "firstload") {
        console.log("first load");
        groupDB.find({owner:"admin"}).then( grpArray => {
            console.log(grpArray[0].groups);
            res.send(grpArray[0].groups);
        })

    }
    else {
        res.send({result:"did not receive request for data"});
    }
});

router.get('/registergroup', (req, res) => {
    res.render('groupRegister');
});

router.post('/registergroup', (req,res) => {
    const {grpNumber, grpID, password, password2} = req.body;
    let errors = [];
    if (!grpNumber || !grpID || !password || !password2) {
        errors.push({msg: "Please fill in all fields"});
    }

    if (password !== password2) {
        errors.push({msg: "Passwords do not match"});
    }

    if (errors.length >0) {
        res.render("groupRegister", {errors, grpNumber, grpID, password, password2});
    }

    else {
        //User validation passed
        account.findOne({$or: [{groupNumber: grpNumber}, {groupUserID: grpID}]}).then(grp => {
            if(grp) {
                errors.push({msg: `Group Number ${grpNumber} or Group ID ${grpID} already has an account`});
                console.log("found same group number");
                res.render("groupRegister", {errors, grpNumber, grpID, password, password2});
            }
            else{
                const newGrp = new account({
                    groupNumber: grpNumber,
                    groupUserID: grpID,
                    groupPassword: password
                });
                console.log(newGrp);
                groupDB.findOne({owner: "admin"}).then(grpArray => {
                    if (grpArray) {
                       grpArray.groups.push("Group " + grpNumber); 
                       grpArray.save();
                    }
                    else {
                        const groupToAdd = "Group " + grpNumber
                        const newGrpArray = new groupDB( {
                            owner: "admin",
                            groups: [groupToAdd]
                        })
                        newGrpArray.save();
                    }
                })
                newGrp.save().then(user => {
                    req.flash('success_msg', "Group successfully registered");
                    res.redirect('/admin/registergroup');
                }).catch(err => console.log(err)); 
            }
        });
        
    }
});

module.exports = router;