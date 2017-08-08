import * as types from './mutations-types'
export default {
  playingMusicAction ({commit, state}, song) {
    // 播放音乐
    commit(types.SET_PLAYING_STATE, true)
    // 初始化playList
    if (!Array.isArray(song)) {
      commit(types.SET_PLAY_LIST, [song])
    }
  }
}
