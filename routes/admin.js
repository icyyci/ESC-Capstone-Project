const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const path = require('path');
const mongoose = require('mongoose');
const utils = require("../config/utils");
var listOfGroups;

//Account Model
const account = require('../models/accountSchema');
const groupDB = require('../models/groupSchema');
const announcementDB = require('../models/announcementSchema');
const requestDB = require("../models/requestSchema");
const chatDB = require("../models/chatSchema");
const allocationDB = require("../models/allocationSchema");

router.get('/', ensureAuthenticated, (req, res) => {
    if(req.user.Role == "admin") {
        res.sendFile(path.join(__dirname, "/../client/WebPages/adminPage.html"));

    }
    else {
        res.redirect('/user');
    }
});

router.post('/', (req,res) => {
    console.log(req.body);
    if (req.body.request == "data") {
        requestDB.findOne({groupNumber: req.body.group}).then(gr => {
            console.log(gr.groupRequest);
            res.send(gr.groupRequest);
        }).catch(() => {
            res.send({});
        })
    }
    else if(req.body.request == "firstload") {
        console.log("first load");
        groupDB.findOne({owner: "admin"}).then( grpArray => {
            console.log(grpArray.groups);
            listOfGroups = grpArray.groups;
            res.send(grpArray.groups);
        })
        
    }

    else if (req.body.request == "announcement") {
        console.log("announcement");
        console.log(listOfGroups);
        if (req.body.group == "all") {
            if (listOfGroups.length == 0) {
                console.log("error, no groups registered");
                res.send("error, no groups registered");
            }
            else {
                for (var i = 0; i < listOfGroups.length; i++){
                    listOfGroups[i] = utils.idFormat(listOfGroups[i]);
                }
                for (const groupToPost of listOfGroups) {
                    console.log(groupToPost);
                    announcementDB.findOne({groupID: groupToPost}).then(grp => {
                        if(grp) {
                            grp.Announcement.push(req.body.message)
                            grp.save();
                        }
                        else {
                            console.log(groupToPost + " does not exist");
                            const newGrpAnnouncement = new announcementDB({
                                groupID: groupToPost,
                                Announcement: req.body.message
                            })
                            newGrpAnnouncement.save();
                        }
                    })
                }
            }
        }
        else {
            var groupSelected = req.body.group;
            groupSelected = utils.idFormat(groupSelected);
            announcementDB.findOne({groupID: groupSelected}).then(grp =>{
                if (grp){
                    grp.Announcement.push(req.body.message);
                    grp.save();
                }
                else {
                    const newGrpAnnouncement = new announcementDB({
                        groupID: groupSelected,
                        Announcement: req.body.message
                    })
                    newGrpAnnouncement.save();
                }
            })

        }
    }
    else if (req.body.request == "unregister") {
        var groupToUnregister = req.body.group;
        requestDB.findOneAndDelete({groupNumber: groupToUnregister}).then(res => {});
        chatDB.findOneAndDelete({chatRoom: groupToUnregister}).then(res => {});
        announcementDB.findOneAndDelete({groupID: groupToUnregister}).then(res =>{});
        account.findOneAndDelete({groupUserID: groupToUnregister}).then(res =>{});
        allocationDB.findOneAndDelete({Group: groupToUnregister}).then(res => {});
        groupDB.findOne({owner: "admin"}).then(grpArray=> {
            console.log("hello" + grpArray.groups);
            var grpLst = grpArray.groups;
            var found = false;
            for (var i = 0; i < grpLst.length; i ++) {
                var grp = grpLst[i].split(' ').join('').toLowerCase();
                if (grp === groupToUnregister) {
                    grpLst.splice(i, 1);
                    found = true;
                    break;
                }
            }
            if (found) {
                grpArray.groups = grpLst;
                grpArray.save();
            }
            res.send(grpLst);
        })
    }

    else {
        console.log("Error no request");
        res.send({result:"did not receive request for data"});
    }
});

router.get('/registergroup', ensureAuthenticated,(req, res) => {
    if (req.user.Role == "admin") {
        res.render('groupRegister');
    }
    else{
        res.redirect("/user");
    }
    
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