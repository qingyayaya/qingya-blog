#!/usr/bin/env node

process.title = 'qingya';

const program = require('commander');
const fs = require('fs')
const path = require('path');
const appInfo = require('../package.json');
const qingya = require('../lib/index');

program
  .version(appInfo.version, '-v, --version')
  .option('-g, --generate', 'Generate')
  .option('-c, --clear', 'Clear MD5 history')
  .option('-d, --deploy', 'Deploy to git')
  .option('-i, --initgit', 'Initialize git')
  .option('-p, --push', 'Push to git')
  .parse(process.argv);

if (program.generate) {
  new qingya().generate();
}

if (program.clear) {
  new qingya().clearMD5();
}

if (program.deploy) {
  new qingya().deploygit('update');
}

if (program.initgit) {
  new qingya().initgit();
}

if (program.push) {
  new qingya().pushgit();
}