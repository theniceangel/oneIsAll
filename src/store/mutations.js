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
  }
}
