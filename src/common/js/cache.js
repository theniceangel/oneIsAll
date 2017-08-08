// 存放localstorage本地存储的一些数据
import storage from 'good-storage'
import {findIndexInArray} from 'common/js/util'
const STORE_LIST = '__STORE_LIST__'
// 获取用户收藏的歌单
export function getStoreList () {
  let storeList = storage.get(STORE_LIST, [])
  return storeList
}
// 设置用户收藏的歌单
export function setStoreList (songId) {
  let storeList = storage.get(STORE_LIST, [])
  let index = findIndexInArray(storeList, songId)
  if (index > -1) {
    storeList.splice(index, 1)
  } else {
    storeList.push(songId)
  }
  storage.set(STORE_LIST, storeList)
  return storeList
}
