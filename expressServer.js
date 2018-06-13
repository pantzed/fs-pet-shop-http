'use strict';

var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json')
var port = process.env.PORT || 8000;

app.disable('x-powered-by');

app.get('/pets', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.log(error(err.stack));
      return res. sendStatus(500);
    }

    let pets = JSON.parse(petsJSON);

    res.set('Content-Type', 'application/json');
    res.send(pets);
  });
});

app.get('/pets/:id', (req, res) => {
  fs.readFile(petsPath, 'utf8', (err, petsJSON) => {
    if (err) {
      console.log(error(err.stack));
      return res. sendStatus(500);
    }

    let id = Number.parseInt(req.params.id);
    let pets = JSON.parse(petsJSON);

    if (id<0 || id >= pets.length || Number.isNaN(id)){
      return res.sendStatus(404);
    }

    res.set('Content-Type', 'application/json');
    res.send(pets[id]);
  });
});

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;