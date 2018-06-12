'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 8000;

const server = http.createServer(function(req, res) {

  let method = req.method;
  let url = req.url;
  let headers = req.headers;
  let urlArr = url.split('/');
  let targetFile = `${urlArr[1]}.json`;
  let index = urlArr[2];

  switch (method) {
    case 'GET': get(targetFile, index); break;
    default: break;
  }

  function get(whatPath, index) {
    let responseBody;
    let thisPath = path.join(__dirname, targetFile);
    fs.readFile(thisPath, 'utf8', (err, data) => {
      if (err) throw err;

      let pets = JSON.parse(data);

      if (index === undefined) {
        responseBody = res.end(JSON.stringify(pets));
      }
      if (index) {
        if (index < 0 || index > pets.length -1) {
          responseBody = `Please enter a valid index!`;
          res.setHeader('Content-Type', 'text/plain');
          res.statusCode= 404;
          res.end(responseBody);
        }
      } 

      res.setHeader('Content-Type', 'text/plain');
      res.end(responseBody);

    });
  }

});

server.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = server;