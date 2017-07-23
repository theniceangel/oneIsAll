import axios from 'axios'
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
      axios.get(url).then((res) => {
        let data = res.data
        this.duration = data.duration
        this.singers = data.singers
        this.name = data.name
        this.url = data.url
        this.coverUrl = data.coverUrl
        resolve()
      })
    })
  }
}

export const createSong = (id) => {
  return new Song(id)
}
