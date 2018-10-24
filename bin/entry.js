/**
 * @note
 * @author  wangyuefeng 
 * @create  2018-10-01
 */
const fs = require('fs')
const path = require('path')
const tips = "// This file is auto gererated by /bin/build-entry.js"
const pagePath = 'src/pages'
const entryDir = path.join(__dirname, '../src/pages')

let args = process
  .argv
  .splice(2);
((entryDir) => {
  let entryResult = []
  loopDir(entryDir, (fileDir) => {
    const relative = path.relative(entryDir, fileDir)

    const ext = relative.substring(relative.lastIndexOf('.'), relative.length)
    const rpath = relative.substring(0, relative.lastIndexOf('/') + 1)
    const template = pagePath + '/' + relative.replace(/entry\.(js|ts)/, 'entry.html')
    
    const htmlPath = path.join(__dirname, '..', template)
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8')
    let title = htmlContent.match(/<title>(.*)<\/title>/)
    title = title ? title[1] : ''

    entryResult.push(`{
      path: '${rpath}',
      name: 'entry',
      template: '${template}',
      ext: '${ext}',
      title: '${title}'
    }`)
  });
  
  const content = `${tips}
  module.exports = [
  ${entryResult.join(',\n')}
  ]`
  fs.writeFileSync(path.join(__dirname, "../config/entry.js"), content);
})(entryDir)

/**
 * 递归文件夹
 * @param dir
 * @param cb
 */
function loopDir(dir, cb) {
  const pages = fs.readdirSync(dir);

  pages.forEach(name => {

    const fileDir = path.join(dir, name);

    const stat = fs.statSync(fileDir);
    // 当前为文件结束
    if (stat.isFile()) {
      // 过滤不需要的文件

      if (filterFile(fileDir)) {
        cb && cb(fileDir);
      }
    } else if (stat.isDirectory()) {
      // 当前为文件夹继续遍历
      if (!!fileDir.match(/(img|image)s?/)) {
        return;
      }
      loopDir(fileDir, cb);
    }
  });
}

function filterFile(fileDir) {
  return fileDir.match(/entry.(js|ts)/) != null && fileDir.indexOf(args[0] || '') > -1
}
