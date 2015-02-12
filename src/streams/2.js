'use strict';

const fs = require('fs');
const hl = require('highland');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  let data = hl([inputFile]);

  data
    .flatMap(hl.wrapCallback(fs.readFile.bind(fs)))
    .flatMap(hl.wrapCallback(process1))
    .flatMap(hl.wrapCallback(process2))
    .flatMap(hl.wrapCallback(process3))
    .stopOnError(function(err) {
      res.status(500).send(err);
    })
    .apply(function(result) {
      res.status(200).send(result);
    });
});

app.listen(3000);
