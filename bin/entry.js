const fs = require('fs')
const path = require('path')
const tips = "这个文件bin/entry.js 执行时自动生成"
const pagePath = 'src/pages'
const entryDir = path.join(__dirname, '../src/pages')

let args = process.argv.splice(2)

let entryResult = []
  
;((entryDir) => {
  loopDir(entryDir, (fileDir) => {
    // pushFileToEntry(fileDir);
    // console.log(fileDir);
    
  });
  
  fs.writeFileSync(path.join(__dirname, "../config/entry.js"), 'content');
})(entryDir)








/**
 * 递归文件夹
 * @param dir
 * @param cb
 */
function loopDir(dir, cb) {
  const pages = fs.readdirSync(dir);
  
  pages.map(name => {
    console.log(name);
    
    const fileDir = path.join(dir, name);
    console.log(fileDir);
    
    const stat = fs.statSync(fileDir);
    console.log(stat.isFile());
    console.log(stat.isDirectory());
    
    // 当前为文件结束
    if (stat.isFile()) {
      // 过滤不需要的文件
      // if (filterFile(fileDir)) {
      //   cb && cb(fileDir);
      // }
    } else if (stat.isDirectory()) {
      // 当前为文件夹继续遍历
      // if (replaceBackSlash(fileDir).match(exclude)) {
      //   return;
      // }
      loopDir(fileDir, cb);
    }
  });
}
