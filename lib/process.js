'use strict';

exports = module.exports = function(input, callback) {
  var result = input + ' - processed\n';
  setTimeout(callback.bind(null, null, result), 100);
};
