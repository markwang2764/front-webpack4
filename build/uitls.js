const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackScriptAttributesPlugin = require('html-webpack-script-attributes-plugin');
const chalk = require('chalk');
const log = console.log;
const chalkWarning = chalk.keyword('orange');

function resolve(dir) {
  return path.join(__dirname, dir)
}
exports.computeEntry = function (entry) {

  entry = entry || []
  let result = {}
  for (let i = 0, len = entry.length; i < len; i++) {
    let item = entry[i]
    let rpath = item.path
    let name = item.name
    let ext = item.ext
    let entryJsPath = path.join(__dirname, '../src/pages/' + rpath + name + ext);
    result[rpath + name] = [entryJsPath]
    log(chalkWarning('open ' + item.path + 'entry.html'));
  }
  return result
}


exports.computeHtmlWebpackEntry = function (entry) {
  entry = entry || [];
  let result = [];

  for (let i = 0, len = entry.length; i < len; i++) {
    let item = entry[i];
    let path = item.path;
    let name = item.name;
    // let pathBuild = path.replace(/\//g, '-')
    let pathBuild = path;
    let template = item.template;

    result.push(
      new HtmlWebpackPlugin({
        template: template,
        filename: path + name + '.html',
        inject: true, // 默认值，script标签位于html文件的 body 底部
        chunks: [pathBuild + name], // 不指定的话就会加载所有的chunk
        // chunks: [pathBuild + name, 'runtime~' + pathBuild + name, 'vendors', 'app', 'default'], // 不指定的话就会加载所有的chunk
        // chunks: [pathBuild + name, 'vendors', 'default'], // 不指定的话就会加载所有的chunk
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        minify: false // Pass html-minifier's options as object to minify the output
      })
    );
  }

  // result.push(
  //   new HtmlWebpackScriptAttributesPlugin({
  //     crossorigin: 'anonymous'
  //   })
  // );
  
  return result;
};

exports.assetsSubDirectory = function() {

  [].slice.call(arguments, 0).unshift('');
  // console.log(arguments)
  return path.posix.join.apply(null, arguments);
};


exports.cssLoaders = function(options) {
  options = options || {};
  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
      // module: true  // 指定启用css modules
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  };

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      });
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: ['style-loader']
      });
    } else {
      // style-loader,insert style into html
      return [{ loader: 'style-loader' }].concat(loaders);
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less', { javascriptEnabled: true }),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass')
    // stylus: generateLoaders("stylus"),
    // styl: generateLoaders("stylus")
  };
};

exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }
  return output;
};