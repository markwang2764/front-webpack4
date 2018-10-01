const path = require('path')

exports.computeEntry = function (entry) {
  entry = entry || []
  let result = {}
  for (let i = 0, len = entry.length; i < len; i++) {
    let item = entry[i]
    let rpath = item.path
    let name = item.name
    let ext = item.ext
    let entryJsPath = path.join(__dirname, '../src/pages/' + path + name + ext);
    result[rpath + name] = [entryJsPath]
  }
}
