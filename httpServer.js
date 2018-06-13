'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const port = process.env.PORT || 8000;

let server = http.createServer(function(req, res) {

  let method = req.method;
  let url = req.url;
  let headers = req.headers;

  verifyReq(url);

  let targetFile = `pets.json`;
  let indexMatch = url.match(/\/pets\/([-]?\d*)$/);
  let index = (indexMatch !== null) ? parseInt(indexMatch[1]) : 'na';
  let params = parseParams(url);

  switch (method) {
    case 'GET': read(targetFile, index); break;
    case 'POST': create(targetFile, index, params); break;
    default: break;
  }

  function verifyReq(url) {
    let checkPath = (url.match(/\/pets/) !== null) ? true : false;
    if (checkPath === false) {
      res.setHeader('Content-Type', `text/plain`);
      res.statusCode = 404;
      res.end("Not Found");
    }
  }

  function parseParams(url) {
    return querystring.parse(url.match(/([\w\=\&]+[\w]$)/g)[0]);
  }

  function create(targetFile, index, params) {
    let responseBody;
    let responseType = 'application/json/';
    let status = 200;
    let thisPath = path.join(__dirname, targetFile);
    
    console.log(true);
  }

  function read(targetFile, index) {
    let responseBody;
    let responseType = 'application/json/';
    let status = 200;
    let thisPath = path.join(__dirname, targetFile);

    fs.readFile(thisPath, 'utf8', (err, data) => {
      if (err) throw err;

      let pets = JSON.parse(data);

      if (index === 'na') {
        responseBody = JSON.stringify(pets);
      }
      else if (index >= 0 && index <= pets.length - 1) {
        responseBody = JSON.stringify(pets[index]);
      }
      else {
        responseBody = 'Not Found';
        responseType = 'text/plain';
        status = 404;
        }

      res.setHeader('Content-Type', `${responseType}`);
      res.statusCode = status;
      res.end(responseBody);

    });
  }
});

  server.listen(port, function() {
  console.log('Listening on port', port);

});

module.exports = server;