'use strict';

const fs = require('fs');
const hl = require('highland');
const async = require('async');
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
    res.status(200).send('processed successfully using highland streams');
  };

  let data = hl([inputFile]);

  data
    .flatMap(hl.wrapCallback(
      async.compose(
        fs.writeFile.bind(fs, outputFile),
        process3,
        process2,
        process1,
        fs.readFile.bind(fs)
      )
    ))
    .stopOnError(handleError)
    .apply(handleSuccess);
});

app.listen(3000);
