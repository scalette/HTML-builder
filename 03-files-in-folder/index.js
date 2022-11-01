// import { readdir } from 'node:fs/promises';
// import path from 'path'
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
const path = require('path')
const fs = require('fs')

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const pathToDir = path.join(__dirname, 'secret-folder');
fs.readdir(pathToDir, (err, files)=> {
  files.forEach(file => {
    fs.stat(path.join(pathToDir, file), (err, stats) => {
      if(stats.isFile()){
        console.log([file.split('.')[0],file.split('.')[1] ?? 'none', stats.size + 'bytes'].join(' - '))
      }
    })
  })
})


// (async () => {
//   const files = await readdir(pathToDir)
//   console.log(files)
//   files.forEach(file => {
//     console.log(file)
//   })
// })();