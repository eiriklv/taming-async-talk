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

  let flow = async.compose(
    fs.appendFile.bind(fs, outputFile),
    process3,
    process2,
    process1,
    fs.readFile.bind(fs, inputFile)
  );

  let done = function(err, result) {
    if (err) return res.status(500).send(err);
    res.status(200).send('processed successfully using async lib');
  };

  flow(done);
});

app.listen(3000);
