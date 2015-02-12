'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const promisify = require('../../lib/promisify');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  promisify(fs.readFile.bind(fs))(inputFile)
    .then(promisify(process1))
    .then(promisify(process2))
    .then(promisify(process3))
    .then(function(result) {
      res.status(200).send(result);
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
});

app.listen(3000);
