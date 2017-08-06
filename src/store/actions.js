import * as types from './mutations-types'
export default {
  initHome ({commit, state}, {idList}) {
    // 初始化idList
    commit(types.SET_ID_LIST, idList)
    // 初始化currentDay
    commit(types.SET_CURRENT_DAY, 0)
  },
  playingMusicAction ({commit, state}, song) {
    // 播放音乐
    commit(types.SET_PLAYING_STATE, true)
    // 初始化playList
    if (!Array.isArray(song)) {
      commit(types.SET_PLAY_LIST, [song])
    }
  }
}
