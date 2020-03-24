const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');

//Account Model
const account = require('../models/accountSchema');

router.get('/', ensureAuthenticated, (req, res) => {
    if(req.user.Role == "admin") {
        res.render('adminHome');
    }
    else {
        res.redirect('/user');
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
                newGrp.save().then(user => {
                    req.flash('success_msg', "Group successfully registered");
                    res.redirect('/admin/registergroup');
                }).catch(err => console.log(err)); 
            }
        });
    }
});

module.exports = router;