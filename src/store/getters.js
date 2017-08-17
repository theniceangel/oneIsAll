// getters参照state的注释
export default {
  currentDate (state) {
    return state.currentDate
  },
  currentSong (state) {
    return state.playList[state.currentPlayIndex] || {}
  },
  playingState (state) {
    return state.playingState
  },
  playingMode (state) {
    return state.playingMode
  },
  playList (state) {
    return state.playList
  },
  storeList (state) {
    return state.storeList
  }
}
