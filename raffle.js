#!/usr/bin/env node

var fs = require('fs');

var name = 'raffle.json';
var noop = function() {};

function random(count){

  read(function(err, data) {
    var i = 0;
    while(i < count){
      var a = (Math.random()*600).toFixed(0);
      if(!~data.indexOf(a)){
        data.push(a);
        console.log(a);
        i++;
      }
    }
    write(data, noop);
  })
}

function write(data, cb) {
  fs.writeFile(name, JSON.stringify(data), cb);
}

function read(cb) {
  fs.readFile(name, function(err, data) {
    if (err) {
      if (err.code == 'ENOENT') return cb(null, ["0"]);
      return cb(err);
    }
    cb(null, JSON.parse(data.toString()));
  })
}

var argv = process.argv;
var count = argv[2];
random(count || 0);
