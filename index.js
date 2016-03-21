#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var pwd = process.cwd();

function copy(src,dest){

  var srcStat = fs.lstatSync(src);

  if(srcStat.isDirectory()){

    if(!fs.existsSync(dest)){
      fs.mkdirSync(dest);
    }

    return fs.readdirSync(src).forEach(function (filePath) {
      return copy(path.join(src,filePath),path.join(dest,filePath));
    }).every(function (r) {
      return r;
    });
  }else{
    return fs.writeFileSync(dest,fs.readFileSync(src));
  }
}


module.exports = function (src,dest) {

  return copy(
    path.resolve(pwd,src),
    path.resolve(pwd,dest)
  );
};
