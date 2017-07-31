var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// 解析虾米音乐的真实播放路径
exports.genRealPathOfXiami = function (location) {
  // 凯撒数列
  // loaction的值类似于下面的结构是
  /**
   * 5
   h3%5co9%32E4316EpakDEb825af3525-n
   tA2.dm32%F6%%65_3ued165cE%cb%9E%u
   t%Fan%%F51%25_4l%ty72dee%5%457%5l
   p2ol.251E%5FE8%.3h%%8dba5E5-E25El
   %FmicFE9%5E1895mF_3515f%E2E11%E-
   */
    // 从上可以看出,第一个代表行数 n
    // 每行字符串的个数等于(总字符串个数 - 1 ) / n
    // 但是最后一行的字符数会少一个
    // 然后竖起来读,会发现是个http://....地址,不过需要decode
  var s = location.substring(1),
      rows = Number(location.charAt(0)), // 总行数
      // 每行的字符串个数,但是不能保证每行的字符串个数都一样，因为接口返回的location会动态变化
      // 经过观察发现
      // 前theFormer行的字符串个数是column个
      // theLatter行的字符串个数是column-1个
      column = Math.ceil((location.length - 1) / rows),
      theFormer = s.length % rows,
      theLatter = rows - theFormer,
      ret = [],
      urlArr = [], // 用来放散列的url单个字符串，最后join再生成url
      httpUrl = '' // 最后解密出来的url地址
  if (theFormer === 0) {
    for (var i = 0; i < theLatter; i++) {
      let str = ''
      str = s.substring(theFormer*column + i *column, theFormer*column + (i + 1) * column)
      ret.push(str)
    }
  } else {
    for (var i = 0; i < theFormer; i++) {
      let str = ''
      str = s.substring(i * column, (i + 1) * column)
      ret.push(str)
    }
    for (var i = 0; i < theLatter; i++) {
      let str = ''
      str = s.substring(theFormer*column + i *(column - 1), theFormer*column + (i + 1) * (column - 1))
      ret.push(str)
    }
  }
  // 解密url地址
  for (var i = 0; i < column; i++) {
    for (var k = 0; k < ret.length; k++) {
      urlArr.push(ret[k].charAt(i))
    }
  }
  httpUrl = decodeURIComponent(urlArr.join('')).replace(/\^/ig, 0)
  console.log(httpUrl)
  return httpUrl
}
