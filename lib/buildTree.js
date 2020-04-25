const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');

const buildTree = startPath => {
  // ensure startPath is not the 'xnm' directory
  if (startPath.endsWith('xnm') || startPath.endsWith('x-node-modules')) {
    console.log(chalk.redBright(`DO NOT REMOVE: ${startPath}`));
    return;
  }

  // array of "failed to remove" paths
  let notRemoved = [];

  // read directory contents of startPath
  fs.readdir(startPath, (err, entries) => {
    // iterate over directory contents of each startPath entry
    entries.forEach(entry => {
      const newPath = path.join(startPath, entry);

      // recursively iterate over subdirectories
      fs.lstat(newPath, (err, stats) => {
        if (stats.isDirectory()) {
          // base case: delete node_modules
          if (entry === 'node_modules') {
            rimraf(newPath, err => {
              // show error message to user and mark newPath as notRemoved
              if (err) {
                console.error(
                  chalk.redBright(
                    `There was an issue removing the node_modules directory at ${newPath}`
                  ),
                  chalk.redBright(err.message)
                );
                notRemoved.push(newPath);
              }
            });
            // show success message to user
            if (!notRemoved.includes(newPath)) {
              console.log(
                chalk.greenBright(`Successfully deleted: ${newPath}`)
              );
            }
          }
          // recursive case: call buildTree on this directory
          else {
            buildTree(newPath);
          }
        }
      });
    });
  });
};

module.exports = buildTree;
