import * as types from './mutations-types'
import {setStoreList} from 'common/js/cache'
export default {
  [types.SET_CURRENT_PAGE] (state, sequence) {
    state.currentPage = sequence
  },
  [types.SET_CURRENT_DATE] (state, date) {
    state.currentDate = date
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_PLAY_INDEX] (state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playingState = flag
  },
  [types.SET_PLAYING_MODE] (state) {
    state.playingMode = state.playingMode === 0 ? 1 : 0
  },
  [types.SET_STORE_LIST] (state, id) {
    state.storeList = setStoreList(id)
  }
}
