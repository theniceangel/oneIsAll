require('./check-versions')()
var axios = require('axios')
var config = require('../config')
var fastXmlParser = require('fast-xml-parser');
var utils = require('./utils')

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var routers = express.Router()
// 根据日期获取某一天的Home组件列表 /api/onelist/2017-08-09/
routers.get('/onelist/:date/:cityName', function (req, res) {
  // 通过fiddler抓包后发现，必须要待version参数，要不然返回的数据比实际数据少了一条
  var url = 'http://v3.wufazhuce.com:8000/api/channel/one/' + req.params.date + '/' + encodeURIComponent(req.params.cityName)+'?version=v4.3.0'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取read组件下面的列表
routers.get('/channel/reading/more/:id', function (req, res) {
  var url = 'http://v3.wufazhuce.com:8000/api/channel/reading/more/'+ req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取music组件下面的列表
routers.get('/channel/music/more/:id', function (req, res) {
  var url = 'http://v3.wufazhuce.com:8000/api/channel/music/more/'+ req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取movie组件下面的列表
routers.get('/channel/movie/more/:id', function (req, res) {
  var url = 'http://v3.wufazhuce.com:8000/api/channel/movie/more/'+ req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取虾米音乐真实播放地址 http://www.xiami.com/song/playlist/id
routers.get('/song/playlist/id/:id', function (req, res) {
  var url = 'http://www.xiami.com/song/playlist/id/'+ req.params.id
  axios.get(url).then((response) => {
    var result = fastXmlParser.parse(response.data);
    // result,但是我并不需要这么多信息,
    // 仅需要duration,singers,name,url,coverUrl
    console.log(result)
    let song = {};
    song.duration = result.playlist.trackList.track.length
    song.singers = result.playlist.trackList.track.singers
    song.name = result.playlist.trackList.track.songName
    song.url = utils.genRealPathOfXiami(result.playlist.trackList.track.location)
    song.coverUrl = result.playlist.trackList.track.album_pic
    res.json(song)
  }).catch((e) => {
    console.log(e)
  })
})
app.use('/api', routers)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
