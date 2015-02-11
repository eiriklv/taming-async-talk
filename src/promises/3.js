'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const promisify = require('../../lib/promisify');

let app = express();

app.get('/process-file', function(req, res) {
  let inputFile = '../../data/input.txt';
  let outputFile = '../../data/output.txt';

  promisify(fs.readFile.bind(fs))(inputFile)
    .then(promisify(process1))
    .then(promisify(process2))
    .then(promisify(process3))
    .then(promisify(fs.appendFile.bind(fs, outputFile)))
    .then(function(data) {
      res.status(200).send('processed successfully using ES6 promises');
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.listen(3000);
