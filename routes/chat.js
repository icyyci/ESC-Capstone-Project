var express = require('express');
var http = require('http');
const server = require('../server');
var path = require('path');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const mongoose = require('mongoose');



router.get('/', ensureAuthenticated, (req,res) => {
    res.sendFile(path.join(__dirname + "/../client/WebPages/chat.html"));

    var init = true; //Set to true when the page first loads

    //Allocate Chat Room for Admin and Student
    var room = req.user.groupUserID;
    if (req.user.Role == "admin") {
        room = req.query.chat || 0;
    }

    //Initialise DB
    var chatDB = require('../models/chatSchema');
    var roomDB;

    //Initialise array
    let socket_id = [];

    //Initialise io
    const io = req.app.get('socket.io');

    //Establish connection with IO
    io.on('connection', (socket) => {
        //Remove duplicates
        socket_id.push(socket.id);
        if (socket_id[0] === socket.id){
            io.removeAllListeners('connection');
        }

        //Join chat room
        socket.join(room);
        console.log(`${req.user.groupUserID} connected to chat at room ${room}`);

        //Search DB to see if chat history exist
        chatDB.findOne({chatRoom: room}).then(rm => {
            if (rm) { //If it exist, we set roomDB to reference that particular room's database
                roomDB = rm;
                chatHistory = roomDB.Messages
                while(init) { //While its the first load
                    console.log("setting up chat history");
                    //We update the client side with the chat history
                    for (var i = 0; i < chatHistory.length; i++) {
                        var sender = chatHistory[i].sender;
                        var chatmsg = chatHistory[i].msg;
                        io.to(room).emit('chat message', sender + ": " + chatmsg);
                    }
                    init = false; //Once update is complete, we set this to false to prevent duplicate updates
                }
            }

            else { //Else, create a database for this room in mongoDB
                const newChat = new chatDB({
                    chatRoom: room
                })
                newChat.save();
                roomDB = newChat;
            }
        })

        //Scan the client side for message input
        socket.on('chat message', msg => {
            //transmit message to respective chatroom
            io.to(room).emit('chat message', req.user.groupUserID + ": " + msg);
            //Save the message in the database
            roomDB.Messages.push({
                sender: req.user.groupUserID,
                msg: msg
            })
            roomDB.save();
        })

    })

})

module.exports = router;