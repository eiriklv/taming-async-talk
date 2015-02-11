'use strict';

const fs = require('fs');
const express = require('express');
const process1Sync = require('../../lib/process-sync');
const process2Sync = require('../../lib/process-sync');
const process3Sync = require('../../lib/process-sync');

let app = express();

app.get('/process-file', function(req, res) {  
  let inputFile = '../../data/input.txt';
  let outputFile = '../../data/output.txt';

  try {
    let inputData = fs.readFileSync(inputFile);
    let processedData1 = process1Sync(inputData);
    let processedData2 = process2Sync(processedData1);
    let processedData3 = process3Sync(processedData2);

    fs.appendFileSync(outputFile, processedData3);
    res.status(200).send('processed successfully using synchronous blocking APIs');

  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000);
