#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var pwd = process.cwd();

var argv = process.argv.slice(2);

function copy(src,dest){
  var srcStat = fs.lstatSync(src);

  if(srcStat.isDirectory()){

    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    fs.readdirSync(src).map(function (filePath) {
      return copy(path.join(src,filePath),path.join(dest,filePath));
    });
  }else{
    fs.writeFileSync(dest,fs.readFileSync(src));
  }
}

if(argv.length === 2){
  beforeCopy(argv[0],argv[1]);
}

function beforeCopy(src,dest) {
  var from = path.resolve(pwd,src);
  var to = path.resolve(pwd,dest);

  console.log('from:',from);
  console.log('to:',to);

  copy(from,to);

  console.log('done');
};

module.exports = beforeCopy;