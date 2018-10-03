const chalk = require('chalk');
const log = console.log;
const chalkError = chalk.bold.red;
const chalkInfo = chalk.blue;
const chalkWarning = chalk.keyword('orange');
const { execCmd } = require('./uitls')
const spawn = require('child_process').spawn

let arguments = process.argv.splice(2)

execCmd(`npm run build:file ${arguments[0] ? arguments[0] : ''}`)
  .then(() => {
    
    const www = spawn('node', ['./bin/www.js'])
    
    www.stdout.on('data', data => {

      if (data.toString().match(/error\s{2,}/ig)) {
        log(chalkError(data));
      } else if (data.toString().match(/done\s{2,}/ig)) {
        log(chalkWarning(data));
      } else {
        log(chalkInfo(`${data}`));
      }

      www.stderr.on('data', (data) => {
        log(chalkError(`stderr: ${data}`));
      });
  
      www.on('close', (code) => {
        log(chalk.blue(`child process exited with code ${code}`));
      });
    })
  })
  .catch((error) => {
    log(chalkError(error));
});