const Parser = require('../src/parser.js');
const assert = require('assert');
let test = {};
exports.test = test;


const parseRules = {
  validKeys: ['-n','-c'],
  explicitOption: ['-h','--help'],
  defaultValue: '10',
  options:{'-n': '10'},
  files:[],
  flags:[]
};

test['parse should return default object when no arguments are passed']=function(){
  let args = [];
  let expected = {
  options: {'-n': '10'},
  files: [],
  flags:[]};
  let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return default option when one file is passed']=function(){
  let args = ['one.txt']
  let expected = {
    options: {'-n': '10'},
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return default key when only value is passed']=function(){
  let args = ['-8','one.txt'];
  let expected = {
    options: {'-n': '8'},
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return given option when option is passed separate']=function(){
  let args = ['-n','15','one.txt'];
  let expected = {
    options: { '-n': '15' },
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return given option when option is passed together']=function(){
  let args = ['-n15','one.txt'];
  let expected = {
    options: { '-n': '15' },
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return given option for the char option']=function(){
  let args = ['-c7','one.txt'];
  let expected = {
    options: { '-c': '7' },
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return all arguments in file when one arguments are passed two or more times continuously']=function(){
  let args = ['-n','-n','-n','15','one.txt'];

  let parser = new Parser(parseRules);
  assert.throws(function() {parser.parse(args)});
};

test['parse should return last option when same options are passed']=function(){
  let args = ['-n','10','-n','20', 'one.txt'];
  let expected = {
    options: {'-n': '20'},
    files: [ 'one.txt' ],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return all files when two or more files are passed']=function(){
  let args = ['-n','10','one.txt','two.txt'];
  let expected = {
    options: {'-n': '10'},
    files: [ 'one.txt' , 'two.txt' ],
    flags:[]};
    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should read option as files when it find any non option argument']=function(){
  let args = ['-n','10','one.txt','-c','20'];
  let expected = {
    options: {'-n': '10'},
    files: ['one.txt','-c','20'],
    flags:[]};

    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return all different option when more options are passed']=function(){
  let args = ['-n','10','-c','20', 'one.txt'];
  let expected = {
    options: {'-n': '10','-c': '20'},
    files: ['one.txt'],
    flags:[]};
    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};

test['parse should return help when passed argument is help with double hyphen']=function(){
  let args = ['-n','10','--help', 'one.txt'];
  let expected = {
    options: {'-n': '10'},
    files: ['one.txt'],
    flags:['--help'] };
    let parser = new Parser(parseRules);
  assert.deepEqual(parser.parse(args),expected);
};
