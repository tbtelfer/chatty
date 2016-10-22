var express = require('express');
var bodyParser = require('body-parser');
// var cors = require('cors');

var app = express();
// app.use(cors());
app.use(bodyParser());

app.listen(1200, function() {
    console.log('Listening on port 1200');
});

var messages = [{message : "Message 1: Don't do that!", time: new Date()},
          {message : "Message 2: Where's the fire", time: new Date()},
          {message : "Message 3: Thar ain no shine when she's gone...", time: new Date()},
          {message : "Message 4: Live the dream", time: new Date()}];


// Answer the browsers security request (it makes an OPTIONS CALL)
// check for an OPTIONS method
app.options('/', function( req, res, next){
  res.status(200).set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }).send();
});


// GET
app.get('/', function( req, res){
  res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));
});

/// POST
app.post('/', function(req, res){

  messages.push({
    message: req.body.message,
    time: new Date()
  });

  res.status(200).set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'SAMEORIGIN',
    'Content-Security-Policy': "default-src 'self' devmountain.github.io"
  }).send(JSON.stringify(messages));
});
