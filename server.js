const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const moongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');


const server = express();
const httpServer = http.Server(server);


//Passport
require('./config/passport')(passport);

//Database access
moongoose.connect('mongodb+srv://cornelius:hello1234@capstonedb-uvtqb.mongodb.net/test?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log("Connected to mongodb")).catch(err => console.log(err));

//Body Parser
server.use(express.urlencoded({extended: true}));
server.use(express.json());

//Express Session
server.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport Middleware
server.use(passport.initialize());
server.use(passport.session());

//Flash
server.use(flash());

//Static folder
server.use(express.static(path.join(__dirname, 'client')));

//Global Error
server.use((req,res,next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    next();
})

//Routes
server.use('/admin', require('./routes/admin.js'));
server.use('/user', require('./routes/user.js'));
var chatRoutes = require('./routes/chat');
server.use('/chat', chatRoutes);

//EJS
server.use(expressLayouts);
server.set('view engine', 'ejs');

//Connect to server Port
const port = process.env.PORT || 5000;
server.set('port', port);
httpServer.listen(port, () => {
    console.log(`Express server started at ${port}`);
    console.log("hit control C to stop server");
});


var io = require('socket.io')(httpServer);
server.set('socket.io', io);



//Default homepage
server.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'client/WebPages/loginPage.html'));
});




//Login Request
server.post('/', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/',
        failureFlash: true,
    })(req,res,next);
});

