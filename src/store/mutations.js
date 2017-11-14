import * as types from './mutations-types'
import {setStoreMusicList, setFavoriteList} from 'common/js/cache'
export default {
  [types.SET_CURRENT_DATE]  (state, date) {
    state.currentDate = date
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playList = list
  },
  [types.SET_CURRENT_PLAY_INDEX]  (state, index) {
    state.currentPlayIndex = index
  },
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playingState = flag
  },
  [types.SET_PLAYING_MODE]  (state) {
    state.playingMode = state.playingMode === 0 ? 1 : 0
  },
  [types.SET_STORE_MUSIC_LIST]  (state, id) {
    state.storeMusicList = setStoreMusicList(id)
  },
  [types.SET_SHARE_ITEM]  (state, item) {
    state.shareItem.push(item)
  },
  [types.CLEAR_SHARE_ITEM]  (state) {
    state.shareItem.splice(0)
  },
  [types.SET_FAVORITE_ITEM_LIST]  (state, id) {
    state.favoriteItemList = setFavoriteList(id)
  }
}
