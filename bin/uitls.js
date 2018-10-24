/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */
const chalk = require('chalk');
const log = console.log;
const chalkWarning = chalk.keyword('orange');
const exec = require('child_process').exec
exports.execCmd = cmd => new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
        if(error) reject(error)
        if(stderr) reject(stderr)
        log(chalkWarning(`--------------${cmd}-------------`));
        resolve()
    })
})