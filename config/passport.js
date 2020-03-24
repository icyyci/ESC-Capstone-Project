const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const account = require('../models/accountSchema');




module.exports = function(passport) {
    passport.use(
        new localStrategy({usernameField:"userID", passwordField:"password"}, (userID, password,done) =>{
            account.findOne({groupUserID: userID}).then(user => {
                if(!user) {
                    console.log("user id not registered");
                    return done(null, false, {message: "User ID not registered"});
                }
                if (password === user.groupPassword) {
                    return done(null, user);
                }
                else {
                    console.log("password is incorrect");
                    done(null, false, {message: "Password is incorrect"});
                }
            })
        })
    );

    passport.serializeUser((user,done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id,done) => {
        account.findById(id, (err,user) => {
            done(err,user);
        });
    });
}