'use strict';

const fs = require('fs');
const express = require('express');
const promisify = require('../../lib/promisify');
const co = require('co');

const appendFile = promisify(fs.appendFile.bind(fs));
const readFile = promisify(fs.readFile.bind(fs));
const process1 = promisify(require('../../lib/process'));
const process2 = promisify(require('../../lib/process'));
const process3 = promisify(require('../../lib/process'));

let app = express();

app.get('/process-file', function(req, res) {  
  co(function *() {
    let inputFile = '../../data/input.txt';
    let outputFile = '../../data/output.txt';

    try {
      let inputData = yield readFile(inputFile);
      let processedData1 = yield process1(inputData);
      let processedData2 = yield process2(processedData1);
      let processedData3 = yield process3(processedData2);
      
      yield appendFile(outputFile, processedData3);
      res.status(200).send('processed successfully using ES6 generators and promises + co');

    } catch (err) {
      res.status(500).send(err);
    }
  }).catch(onError);
});

function onError(err) {
  console.log('unhandled error:', err);
}

app.listen(3000);
