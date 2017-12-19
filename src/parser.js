const lib = require('./lib.js');

const Parser = function(parseRules){
  this.rules = parseRules;
  this.keys = parseRules.validKeys;
  this.defaultKey = Object.keys(parseRules.options).toString();
  this.options = {};
  this.files = [];
  this.explicitOption = parseRules.explicitOption;
  this.flags = [];
};

Parser.prototype.isValidKey = function(key){
  return this.keys.includes(key);
};

Parser.prototype.isExplicitOption = function(option){
  return this.explicitOption.includes(option);
};

Parser.prototype.isValidOption = function(option){
  let key = lib.getKeyPart(option);
  let int = lib.getIntPart(option);
  return this.isValidKey(key) && lib.isPosNumber(int);
};

Parser.prototype.parsedData = function(){
  if(Object.keys(this.options) == 0){
    this.options = this.rules.options;
  }
  return {
    options:this.options,
    files:this.files,
    flags:this.flags
  }
};

Parser.prototype.parseValidOption = function(args,index){
  let key = lib.getKeyPart(args[index]);
  let int = lib.getIntPart(args[index]);
  this.options[key]=int;
  index++;
  this.parsingArgs(args,index);
};

Parser.prototype.parseValidKey = function(args,index){
  if(lib.isPosNumber(+args[index+1])){
    this.options[args[index]] = args[index+1];
    index += 2;
    this.parsingArgs(args,index);
    return ;
  }
  throw new Error('illegal Option: - '+args[index]);
};

Parser.prototype.parseExplicitOption = function(args,index){
  this.flags.push(args[index])
  index++;
  this.parsingArgs(args,index);
};

Parser.prototype.intParsing = function(args,index){
  if(lib.isNegativeNumber(args[index])){
    this.options[this.defaultKey]=Math.abs(args[index]);
    index++;
    this.intParsing(args,index);
  }
  return this.parsingArgs(args,index);
};

Parser.prototype.parsingArgs = function(args,index){
  if(index>=args.length){
    return ;
  }
  if(this.isValidOption(args[index])){
    this.parseValidOption(args,index);
  } else if(this.isValidKey(args[index])){
    this.parseValidKey(args,index);
  } else if(this.isExplicitOption(args[index])){
    this.parseExplicitOption(args,index);
  } else if(!lib.isOption(args[index])){
    this.files = args.slice(index);
  } else {
    throw new Error(args[index]);
  }
};

Parser.prototype.parse = function(args){
  let index = 0;
  this.intParsing(args,index);
  return this.parsedData();
};
module.exports = Parser;
