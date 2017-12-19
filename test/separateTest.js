const Parser = require('../src/parser.js');
const assert = require('assert');
let test = {};
exports.test = test;


test['isValidKey should return true when argument key is valid']=function(){
  let args = ['-n','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.ok(parser.isValidKey(args[0]))
};

test['isValidKey should return false when argument key is invalid']=function(){
  let args = ['-n','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.notEqual(parser.isValidKey(args[1]))
};

test['isValidOption should return true when argument is a valid option']=function(){
  let args = ['-n2','-c','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.ok(parser.isValidOption(args[0]));
};

test['isValidOption should return false when argument is not a valid option']=function(){
  let args = ['-n2','-c','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.notEqual(parser.isValidOption(args[1]));
};

test['isExplicitOption should return true when argument key is unary option']=function(){
  let args = ['-n','-q','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.ok(parser.isExplicitOption(args[1]))
};

test['isExplicitOption should return false when argument key is not a unary option']=function(){
  let args = ['-n','-q','10'];
  const parseRules = {
    validKeys: ['-n','-c','-b'],
    explicitOption: ['-h','--help','-q','-r'],
    defaultValue: '10',
    options:{'-n': '10'},
    files:[],
    flags:[]
  };
  const parser = new Parser(parseRules);
  assert.notEqual(parser.isExplicitOption(args[0]))
};
