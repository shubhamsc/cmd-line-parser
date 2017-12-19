const lib = require('../src/lib.js');
const assert = require('assert');
let test = {};
exports.test = test;

test['isPosNumber should return true when number is greater than zero']=function(){
  let args = ['-n','4','-c4','one.txt'];
  assert.ok(lib.isPosNumber(args[1]));
};

test['isPosNumber should return false when number is zero or less than zero']=function(){
  let args = ['-n','4','-c4','one.txt'];
  assert.notEqual(lib.isPosNumber(args[0]));
};

test['getKeyPart should return key from given option']=function(){
  let args = ['-n12'];
  assert.equal(lib.getKeyPart(args[0]),'-n');
};

test['getIntPart should return key from given option']=function(){
  let args = ['-n12'];
  assert.equal(lib.getIntPart(args[0]),'12');
};
