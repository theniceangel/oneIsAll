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
  storeMusicList (state) {
    return state.storeMusicList
  },
  shareItem (state) {
    return state.shareItem
  },
  favoriteItemList (state) {
    return state.favoriteItemList
  },
  watchAuthorList (state) {
    return state.watchAuthorList
  }
}
