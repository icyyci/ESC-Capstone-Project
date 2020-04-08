const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const path = require('path');
const mongoose = require('mongoose');

const groupDB = require('../models/groupSchema');
const allocationDB = require('../models/allocationSchema');
const requestDB = require("../models/requestSchema");


inputTokenizer = (inpString) => {
    var tempString = inpString
    var splitString = tempString.split("x");
    var result = [splitString[0], splitString[1]];
    return result;
}

router.get("/", ensureAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname, "/../client/WebPages/map.html"));
})

router.post("/", (req,res) => {

    //console.log(req.body);
    if (req.body.request == "firstload") {
        groupDB.find({owner:"admin"}).then( grpArray => {
            //console.log(grpArray[0].groups);
            listOfGroups = grpArray[0].groups;
            res.send(grpArray[0].groups);
        })
    }
    else if (req.body.request == "data") {
        console.log(req.body);
        var groupID = req.body.group;
        allocationDB.findOne({Group: req.body.group}).then(grpAllo => {
            if (grpAllo) {
                console.log("Found group allo");
                console.log(grpAllo);
                res.send(grpAllo);
            }
            else {
                requestDB.findOne({groupNumber: req.body.group}).then(gr => {
                    if (gr) {
                        console.log("Group Allo missing, found group request instead");
                        console.log(gr.groupRequest);
                        var result = inputTokenizer(gr.groupRequest.showcaseSpaceNeeded);
                        var width = parseInt(result[0],10);
                        var height = parseInt(result[1],10);
                        var x = 0;
                        var y = 0;
                        var newAlloJson = {
                            Group: req.body.group,
                            x: x,
                            y: y,
                            width: width,
                            height: height
                        }
                        console.log(newAlloJson);
                        res.send(newAlloJson);
                    }
                    else {
                        console.log("Group allo and group request missing");
                        var noAlloJson = {
                            Group: req.body.group,
                            x: 0,
                            y: 0,
                            width: 0,
                            height: 0,
                        }
                        console.log(noAlloJson)
                        res.send(noAlloJson);
                    }
                });
            }
        });
    }
    else if (req.body.request == "confirm") {
        console.log(req.body);
        var groupToSave = req.body.group;
        allocationDB.findOne({Group: groupToSave}).then(grpAllo => {
            if (grpAllo) {
                grpAllo.x = req.body.x;
                grpAllo.y = req.body.y;
                grpAllo.width = req.body.width;
                grpAllo.height = req.body.height;
                grpAllo.save();
            }
            else {
                var newGrpAllo = new allocationDB({
                    Group: req.body.group,
                    x: req.body.x,
                    y: req.body.y,
                    width: req.body.width,
                    height: req.body.height
                })
                newGrpAllo.save();
            }
        }).catch( () => {
            console.log("error in allocation");
        })
    }
})


module.exports = router;