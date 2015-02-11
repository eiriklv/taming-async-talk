'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');
const run = require('../../lib/run-simple');
const ncurry = require('../../lib/ncurry');

let app = express();

app.get('/process-file', function(req, res) {  
  run(function *() {
    let inputFile = '../../data/input.txt';
    let outputFile = '../../data/output.txt';

    try {
      let inputData = yield ncurry(2, fs.readFile.bind(fs))(inputFile);
      let processedData1 = yield ncurry(2, process1)(inputData);
      let processedData2 = yield ncurry(2, process2)(processedData1);
      let processedData3 = yield ncurry(2, process3)(processedData2);
      
      yield ncurry(3, fs.appendFile.bind(fs))(outputFile, processedData3);
      res.status(200).send('processed successfully using ES6 generators and currying');

    } catch (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(3000);
