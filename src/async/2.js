'use strict';

const fs = require('fs');
const async = require('async');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/process-file', function(req, res) {
  let inputFile = '../../data/input.txt';
  let outputFile = '../../data/output.txt';

  async.waterfall([
    fs.readFile.bind(fs, inputFile),
    process1,
    process2,
    process3,
    fs.appendFile.bind(fs, outputFile)
  ], function(err, result) {
    if (err) return res.status(500).send(err);
    res.status(200).send('processed successfully using async lib');
  });
});

app.listen(3000);
