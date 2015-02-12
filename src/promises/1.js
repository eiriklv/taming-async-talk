'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  fs.readFileAsync(inputFile)
    .then(Promise.promisify(process1))
    .then(Promise.promisify(process2))
    .then(Promise.promisify(process3))
    .then(function(result) {
      res.status(200).send(result);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.listen(3000);
