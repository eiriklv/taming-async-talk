'use strict';

exports = module.exports = function(fn) {
  let gen = fn();

  function next(err, res) {
    if (err) return gen.throw(err);
    let ret = gen.next(res);
    if (ret.done) return;
    ret.value(next);
  }

  next();
};
