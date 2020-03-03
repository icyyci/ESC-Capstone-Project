const http = require('http');
const path = require('path');
const fs = require('fs');
const express = require('express');

const server = express();
server.use(express.static(path.join(__dirname, 'WebPages')));
const port = process.eventNames.PORT || 5000;
server.set('port', port);
server.listen(port, () => {
    console.log(`Express server started at ${port}`);
    console.log("hit control C to stop server");
});

server.get('/', (req,res) => {
    let file = path.join(__dirname, 'WebPages', 'loginPage.html');
    res.sendFile(file);
});

server.get('/main', (req, res)=> {
    let file = path.join(__dirname, 'WebPages', 'mainpage.html');
    res.sendFile(file);
})
