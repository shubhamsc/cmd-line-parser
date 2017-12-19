let testFiles = ['test/parserTest','test/libTest','test/separateTest'];

let files = 0;
let total = 0;

testFiles.forEach((file)=>{
  console.log('Testing... ' + file + '\n');
  files++;
  let tests = require('./'+file).test;
  let allTests = Object.keys(tests);
  allTests.forEach((test)=>{
    console.log('--> '+test);
    total++
    tests[test]();
  })
  console.log('=====================\n');
});

console.log('\n' + total + ' tests passed from '+files + ' files');
