
const path = require('path')
const fs = require('fs')
const readline = require('readline');
const fsPromises = require('fs/promises')


const pathToDir = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist' ,'bundle.css')


fs.exists(pathToBundle, function(exists) {
  if(exists) {
    fs.unlink(pathToBundle, (err) => {
      if (err) console.log(err)
      fs.readdir(pathToDir, (err, files)=> {
        files.forEach(file => {
          fs.stat(path.join(pathToDir, file), async (err, stats) => {
            if(stats.isFile()){
              const extension = file.split('.')[1] ?? 'none'
              if(extension === 'css') {
                console.log([extension, stats.size + 'bytes'].join(' - '))
                const data = await fsPromises.readFile(path.join(pathToDir, file), 'utf8')
                await fsPromises.writeFile(pathToBundle, data, { flag: 'a+' })
              }
            }
          })
        })
      })
    })
  } else {
    fs.readdir(pathToDir, (err, files)=> {
      files.forEach(file => {
        fs.stat(path.join(pathToDir, file), async (err, stats) => {
          if(stats.isFile()){
            const extension = file.split('.')[1] ?? 'none'
            if(extension === 'css') {
              console.log([extension, stats.size + 'bytes'].join(' - '))
              const data = await fsPromises.readFile(path.join(pathToDir, file), 'utf8')
              await fsPromises.writeFile(pathToBundle, data, { flag: 'a+' })
            }
          }
        })
      })
    })
  }
});




