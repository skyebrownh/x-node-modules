const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const buildTree = startPath => {
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
            rimraf(newPath, err =>
              console.error(
                `There was an issue removing the node_modules directory at ${newPath}`
              )
            );
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

buildTree('/Users/skyebrown/Documents/Projects/Web');
console.log('Thank you for using XNM!');
