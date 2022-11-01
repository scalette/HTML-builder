const path = require('path')
const fs = require('fs')


const pathToDir = path.join(__dirname, 'files');
const pathToDirCopy = path.join(__dirname, 'files-copy');

// fs.readdir(pathToDirCopy, (err, files) => {
//   if (err) throw err;

//   for (const file of files) {
//     fs.unlink(path.join(pathToDirCopy, file), (err) => {
//       if (err) throw err;
//     });
//   }
// });
fs.rm(pathToDirCopy,{ force: true, recursive: true }, err => {
  if (err) throw err
  console.log(`${pathToDirCopy} is deleted!`)
  copyFolder(pathToDir, pathToDirCopy)
})
function copyFolder(pathToDir, pathToDirCopy){
  fs.mkdir(pathToDirCopy, {recursive:true}, err=>{
    if (err) throw err
    console.log(pathToDirCopy, ' created!')
    fs.readdir(pathToDir, (err, files)=> {
      files.forEach(file => {
        fs.stat(path.join(pathToDir, file), (err, stats) => {
          if(stats.isDirectory()){
            copyFolder(path.join(pathToDir, file), path.join(pathToDirCopy, file))
          }
          if(stats.isFile()){
            console.log([file.split('.')[0],file.split('.')[1] ?? 'none', stats.size + 'bytes'].join(' - '))
            fs.copyFile(path.join(pathToDir, file), path.join(pathToDirCopy, file), err => {
              if (err) throw err
            });
          }
        })
      })
    })
  })
}