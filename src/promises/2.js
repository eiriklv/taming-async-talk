'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/process-file', function(req, res) {
  let inputFile = '../../data/input.txt';
  let outputFile = '../../data/output.txt';

  let handleError = function(err) {
    res.status(500).send(err);
  };

  let handleSuccess = function(data) {
    res.status(200).send('processed successfully using bluebird promises');
  };

  fs.readFileAsync(inputFile)
    .then(Promise.promisify(process1))
    .then(Promise.promisify(process2))
    .then(Promise.promisify(process3))
    .then(fs.appendFileAsync.bind(fs, outputFile))
    .then(handleSuccess)
    .catch(handleError);
});

app.listen(3000);
