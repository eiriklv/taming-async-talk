'use strict';

const fs = require('fs');
const express = require('express');
const process1 = require('../../lib/process');
const process2 = require('../../lib/process');
const process3 = require('../../lib/process');

let app = express();

app.get('/process-file', function(req, res) {
  let inputFile = '../../data/input.txt';
  let outputFile = '../../data/output.txt';

  fs.readFile(inputFile, onReadFile);

  function onReadFile(err, data) {
    if (err) return res.status(500).send(err);
    process1(data, onProcess1);
  }

  function onProcess1(err, data) {
    if (err) return res.status(500).send(err);
    process2(data, onProcess2);
  }

  function onProcess2(err, data) {
    if (err) return res.status(500).send(err);
    process3(data, onProcess3);
  }

  function onProcess3(err, data) {
    if (err) return res.status(500).send(err);
    fs.appendFile(outputFile, data, onWriteFile);
  }

  function onAppendFile(err) {
    if (err) return res.status(500).send(err);
    res.status(200).send('processed successfully named continuation passing style');
  }
});

app.listen(3000);
