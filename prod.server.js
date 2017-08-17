var express = require('express')
var axios = require('axios')
var app = express()
var fastXmlParser = require('fast-xml-parser')
var utils = require('./build/utils')
var history = require('connect-history-api-fallback')
app.use(history({
  rewrites: [
    {from: '/', to: '/index.html'}
  ]
}))

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
  var url = 'http://v3.wufazhuce.com:8000/api/channel/reading/more/' + req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取music组件下面的列表
routers.get('/channel/music/more/:id', function (req, res) {
  var url = 'http://v3.wufazhuce.com:8000/api/channel/music/more/' + req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取movie组件下面的列表
routers.get('/channel/movie/more/:id', function (req, res) {
  var url = 'http://v3.wufazhuce.com:8000/api/channel/movie/more/' + req.params.id + '?version=v4.2.2'
  axios.get(url).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
// 获取虾米音乐真实播放地址 http://www.xiami.com/song/playlist/id
routers.get('/song/playlist/id/:id', function (req, res) {
  var url = 'http://www.xiami.com/song/playlist/id/' + req.params.id
  axios.get(url).then((response) => {
    var result = fastXmlParser.parse(response.data)
    // result,但是我并不需要这么多信息,
    // 仅需要duration,singers,name,url,coverUrl
    console.log(result)
    let song = {}
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
app.use(express.static('./dist'))

module.exports = app.listen(9001, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + 9001 + '\n')
})
