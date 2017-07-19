import * as types from './mutations-types'
export default {
  initHome ({commit, state}, {idList}) {
    // 初始化idList
    commit(types.SET_ID_LIST, idList)
    // 初始化currentDay
    commit(types.SET_CURRENT_DAY, 0)
  }
}
