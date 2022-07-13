#!/usr/bin/env node

process.title = 'qingya';

const program = require('commander');
const appInfo = require('../package.json');
const { qingya } = require('../lib/index');

program
  .command('compile <type> <filenames...>')
  .description('compile .md to .html')
  .action((type, filenames) => {
    if (type == 'page') {
      qingya.compilePages(...filenames);
    } else {
      qingya.compilePosts(...filenames);
    }
  });

program
  .version(appInfo.version, '-v, --version')
  .description('cli for qingya-blog.')
  .option('-g, --generate', 'generate')
  .option('-l, --load', 'load config')
  .option('-c, --clear', 'clear MD5 history')
  .option('-i, --init', 'initialize git')
  .option('-d, --deploy [message]', 'deploy to git, default <message> is "update"')
  .option('-p, --push', 'push to git')
  .parse(process.argv);

if (program.initgit) {
  qingya.initgit();
}

if (program.load) {
  qingya.loadConfig();
}

if (program.clear) {
  qingya.clearMD5();
}

if (program.generate) {
  qingya.generate();
}

if (program.deploy) {
  qingya.deploygit(program.deploy || 'update');
}

if (program.push) {
  qingya.pushgit();
}