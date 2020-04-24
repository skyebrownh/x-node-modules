const fs = require('fs');

const buildTree = startPath => {
  // read directory contents of startPath
  fs.readdir(startPath, (err, entries) => {
    console.log(entries);
    // iterate over directory contents of each startPath entry
    entries.forEach(file => {
      const path = `${startPath}/${file}`;

      // recursively iterate over subdirectories
      fs.lstat(path, (err, stats) => {
        if (stats.isDirectory()) {
          buildTree(path);
        }
      });
    });
  });
};

buildTree('/Users/skyebrown/Documents/Projects/Web');
