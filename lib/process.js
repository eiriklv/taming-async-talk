'use strict';

exports = module.exports = function(input, callback) {
  setTimeout(callback.bind(null, null, input), 100);
};
