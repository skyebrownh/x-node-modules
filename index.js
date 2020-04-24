#!/usr/bin/env node

const prompts = require('prompts');
const buildTree = require('./lib/buildTree');

console.log("Before we begin, there's a few things we need to know...");

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
      'All good! Navigate to your preferred root directory first, then run "xnm" again.'
    );
    process.exit(0);
  }

  console.log('Starting deletion process...');
  buildTree(process.cwd());
  console.log('Thank you for using XNM!');
})();
