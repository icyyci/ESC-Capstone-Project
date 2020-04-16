const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const expressLayouts = require('express-ejs-layouts');
const moongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
var bouncer = require ("express-bouncer")(60000,360000,2);


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
server.use('/chat', require('./routes/chat.js'));
server.use('/map', require('./routes/map.js'));
server.use('/groupallocation', require('./routes/groupallocation.js'));


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
server.get('/', bouncer.block, (req,res) => {
    res.sendFile(path.join(__dirname, 'client/WebPages/loginPage.html'));
});

server.get('/admin/cc_map_lvl1_white/:x/:y/:z.jpg', (req,res) => {
    var x = req.params.x;
    var y = req.params.y;
    var z = req.params.z;
    //var newPath = __dirname + '/client/cc_map_lvl1_white/' + x + "/" + y + "/" + z + ".jpg";
    var newPath = path.join(__dirname, "client/cc_map_lvl1_white", x, y , z)
    newPath += ".jpg";
    console.log(newPath);
    res.sendFile(newPath);
})




//Login Request
// server.post('/', (req, res, next) => {
//     console.log(req.body);
//     passport.authenticate('local', {
//         successRedirect: '/admin',
//         failureRedirect: '/',
//         failureFlash: true,
//     })(req,res,next);
// });
server.post('/', bouncer.block, passport.authenticate('local'), (req,res)=> {
    bouncer.reset(req);
    res.redirect("/user");
});

