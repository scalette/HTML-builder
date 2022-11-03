const path = require('path')
const fs = require('fs')
const pathToDir = path.join(__dirname, 'assets');
const pathToDirCopy = path.join(__dirname, 'project-dist', 'assets');
const pathToDirCSS = path.join(__dirname, 'styles');
const pathToDirComponents = path.join(__dirname, 'components');
const pathToBundle = path.join(__dirname, 'project-dist' ,'style.css')
const pathToIndex = path.join(__dirname, 'project-dist' ,'index.html')
const pathTemplate = path.join(__dirname, 'template.html')
const fsPromises = require('fs/promises');
const { format } = require('path');
let objectComponents = {}
let template = ''

fs.rm(path.join(__dirname, 'project-dist'),{ force: true, recursive: true }, err => {
  if (err) throw err
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, err=>{
    if (err) throw err
    copyFolder(pathToDir, pathToDirCopy)
    fs.exists(pathToBundle, async function(exists) {
      if(exists) {
        fs.unlink(pathToBundle, (err) => {
          if (err) console.log(err)
          fs.readdir(pathToDirCSS, (err, files)=> {
            files.forEach(file => {
              fs.stat(path.join(pathToDirCSS, file), async (err, stats) => {
                if(stats.isFile()){
                  const extension = file.split('.')[1] ?? 'none'
                  if(extension === 'css') {
                    console.log([extension, stats.size + 'bytes'].join(' - '))
                    const data = await fsPromises.readFile(path.join(pathToDirCSS, file), 'utf8')
                    await fsPromises.writeFile(pathToBundle, data, { flag: 'a+' })
                  }
                }
              })
            })
          })
        })
      } else {
        fs.readdir(pathToDirCSS, (err, files)=> {
          files.forEach(file => {
            fs.stat(path.join(pathToDirCSS, file), async (err, stats) => {
              if(stats.isFile()){
                const extension = file.split('.')[1] ?? 'none'
                if(extension === 'css') {
                  console.log([extension, stats.size + 'bytes'].join(' - '))
                  const data = await fsPromises.readFile(path.join(pathToDirCSS, file), 'utf8')
                  await fsPromises.writeFile(pathToBundle, data, { flag: 'a+' })
                }
              }
            })
          })
        })
        const paths = await getFilePaths(pathToDirComponents)
        const arr = Object.keys(paths)
        await Promise.all(arr.map(async (file) => {
          objectComponents[file] = await fs.promises.readFile(paths[file], 'utf8')
        }));
        template = await fs.promises.readFile(pathTemplate, 'utf8')
        Object.keys(objectComponents).forEach(key => {template = template.replaceAll(`{{${key}}}`, objectComponents[key])})
        await fsPromises.writeFile(pathToIndex, template)
      }
    });
  })
})
async function getFilePaths (pathToDirComponents) {
  const paths = await fs.promises.readdir(pathToDirComponents)
  const names2 = {}
  paths.forEach(el => {
    names2[el.split('.')[0]] = 1
  })
  Object.keys(names2).map(el => {
    names2[el] = path.join(pathToDirComponents, el +'.html')
  })
  return names2
}
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





