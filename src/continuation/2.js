'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/', function(req, res) {
  let inputFile = '../../data/input.txt';

  fs.readFile(inputFile, onReadFile);

  function onReadFile(err, inputData) {
    if (err) return res.status(500).send(err);
    process1(inputData, onProcess1);
  }

  function onProcess1(err, processedData1) {
    if (err) return res.status(500).send(err);
    process2(processedData1, onProcess2);
  }

  function onProcess2(err, processedData2) {
    if (err) return res.status(500).send(err);
    process3(processedData2, onDone);
  }

  function onDone(err, result) {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  }
});

app.listen(3000);
