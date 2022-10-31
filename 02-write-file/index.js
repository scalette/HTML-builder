const fs = require('fs')
const path = require('path')
const readline = require('readline');
// import * as readline from 'readline/promises';
// import { stdin as input, stdout as output } from 'process';

const output = fs.createWriteStream(path.join(__dirname, 'file.txt'))
console.log('please type text to write:')
let rd = readline.createInterface({
  input: process.stdin,
  //output: fs.createWriteStream(path.join(__dirname, 'file.txt')),
  console: false
})

rd.on('line', line => 
{ if (line === 'exit'){
  console.log('End of input. Chiao!');
  process.exit(0);
} else{
  output.write(line + '\n')
}
})

process.on('SIGINT', () => {
  console.log('Received SIGINT. Chiao!');
  process.exit(0);
});