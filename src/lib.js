const isPosNumber = function(option){
  return option > 0;
};

const isNegativeNumber = function(option){
  return option < 0;
};

const isOption = function(option){
  return (/^-[\S]/g).test(option);
};

const getKeyPart = function(option){
  let regex = (/^[-\w]+[\D]/g);
  let key = option.match(regex);
  if(!key){
    return null;
  }
  return key.toString();
};

const getIntPart = function(option){
  let regex = (/[\d]+$/g);
  let int = option.match(regex);
  if(!int){
    return null;
  }
  return int.toString();
};

exports.isPosNumber = isPosNumber;
exports.isNegativeNumber = isNegativeNumber;
exports.isOption = isOption;
exports.getKeyPart = getKeyPart;
exports.getIntPart = getIntPart;
