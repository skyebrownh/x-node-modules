const fs = require('fs');
const path = require('path');

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
            console.log(`delete ${newPath}`);
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

buildTree('/Users/skyebrown/Documents');
