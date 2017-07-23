import * as types from './mutations-types'
export default {
  [types.SET_CURRENT_PAGE] (state, sequence) {
    state.currentPage = sequence
  },
  [types.SET_CURRENT_DAY] (state, sequence) {
    state.currentDay = sequence
  },
  [types.SET_ID_LIST] (state, idList) {
    state.idList = idList
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_PLAY_INDEX] (state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playingState = flag
  }
}
