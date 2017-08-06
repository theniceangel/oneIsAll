// getters参照state的注释
export default {
  currentPage (state) {
    return state.currentPage
  },
  idList (state) {
    return state.idList
  },
  currentDay (state) {
    return state.currentDay
  },
  currentId (state) {
    return state.idList[state.currentDay]
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
  }
}
