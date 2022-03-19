#!/usr/bin/env node

process.title = 'qingya';

const program = require('commander');
const qingya = require('../lib/index');

program
  .version('0.0.1', '-v, --version')
  .option('-g, --generate', 'Generate all')
  .parse(process.argv);

// generate
if (program.generate) {

  var qy = new qingya();
  qy.generate();

}