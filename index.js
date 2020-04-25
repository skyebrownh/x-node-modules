#!/usr/bin/env node

const prompts = require('prompts');
const boxen = require('boxen');
const chalk = require('chalk');
const buildTree = require('./lib/buildTree');

console.log(
  boxen('XNM: X Node Modules', {
    padding: 1,
    margin: 1,
    borderColor: 'white',
    borderStyle: 'doubleSingle',
    align: 'center',
    backgroundColor: 'magenta'
  })
);
console.log(
  chalk.bold.cyanBright(
    "Before we begin, there's a few things we need to know...\n"
  )
);

(async () => {
  // ensure user is in correct root directory
  const res1 = await prompts({
    type: 'confirm',
    name: 'isCorrectDir',
    message:
      'Are you currently in the root directory where you would like to begin the deletion process?'
  });

  if (!res1.isCorrectDir) {
    console.log(
      chalk.green(
        'All good! Navigate to your preferred root directory first, then run "xnm" again.'
      )
    );
    process.exit(0);
  }

  console.log(chalk.bold.magentaBright('\nStarting deletion process...'));
  buildTree(process.cwd());
})();
