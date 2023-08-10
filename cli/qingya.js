#!/usr/bin/env node

process.title = 'qingya';

import { program } from "commander";
import { Qingya } from "../src/index.js";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const appInfo = require('../package.json');

program
  .version(appInfo.version, '-v, --version')
  .description('cli for qingya-blog.')
  .option('-n, --new', 'new post')
  .option('-g, --generate', 'generate')
  .option('-l, --load', 'load config')
  .option('-c, --clear', 'clear MD5 history')
  .option('-i, --init', 'initialize git')
  .option('-d, --deploy [message]', 'deploy to git, default <message> is "update"')
  .option('-p, --push', 'push to git')
  .parse(process.argv);

const options = program.opts();

var qingya = new Qingya(process.cwd());

if (options.init) {
  qingya.initgit();
}

if (options.load) {
  qingya.updateConfig();
}

if (options.clear) {
  qingya.clearMD5();
}

if (options.new) {
  qingya.newPost();
}

if (options.generate) {
  qingya.generate();
}

if (options.deploy) {
  qingya.deploygit(program.args[0] || 'update');
}

if (options.push) {
  qingya.pushgit();
}
