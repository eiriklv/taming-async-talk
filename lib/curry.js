'use strict';

exports = module.exports = function(fn) {
  let args = Array.prototype.slice.call(arguments, 1);

  return (function curryFn(prevArgs) {
    return function(arg) {
      let totalArgs = prevArgs.concat(Array.prototype.slice.call(arguments));
      if (!arg) totalArgs.push(undefined);

      if (totalArgs.length < fn.length) {
        return curryFn(totalArgs);
      } else {
        return fn.apply(null, totalArgs);
      }
    };
  }(args));
};
