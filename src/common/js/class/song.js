// import axios from 'axios'
export default class Song {
  constructor (id) {
    this.id = id
    this.duration = 0 // 单位为秒
    this.singers = ''
    this.name = ''
    this.url = ''
    this.coverUrl = ''
  }
  initXiamiMusicInfo (id) {
    let url = `/api/song/playlist/id/${id}`
    return new Promise((resolve, reject) => {
      /* axios.get(url).then((res) => {
        let data = res.data
        this.duration = data.duration
        this.singers = data.singers
        this.name = data.name
        this.url = data.url
        this.coverUrl = data.coverUrl
        resolve()
      }) */
      // 用上面的异步请求会导致在ios无法播放
      // 因为ios规定，audio.play（）必须是用户手动触发，而且逻辑不能写在异步请求里面
      // 所以这里是用原生的ajax，并且把async设置为false,即同步请求
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, false)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
          let data = JSON.parse(xhr.responseText)
          this.duration = data.duration
          this.singers = data.singers
          this.name = data.name
          this.url = data.url
          this.coverUrl = data.coverUrl
          resolve()
        }
      }
      xhr.send()
    })
  }
}

export const createSong = (id) => {
  return new Song(id)
}

