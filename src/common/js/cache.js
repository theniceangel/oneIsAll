// 存放localstorage本地存储的一些数据
import storage from 'good-storage'
import {findIndexInArray} from 'common/js/util'
const STORE_LIST = '__STORE_LIST__'
const FAVORITE_ITEM_LIST = '__FAVORITE_ITEM_LIST__'
// 获取用户收藏的歌单
export function getStoreMusicList () {
  let storeList = storage.get(STORE_LIST, [])
  return storeList
}
// 设置用户收藏的歌单
export function setStoreMusicList (songId) {
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
// 获取用户喜欢的列表
export function getFavoriteList () {
  let favoriteList = storage.get(FAVORITE_ITEM_LIST, [])
  return favoriteList
}
// 设置用户喜欢的列表
export function setFavoriteList (id) {
  let favoriteList = storage.get(FAVORITE_ITEM_LIST, [])
  let index = findIndexInArray(favoriteList, id)
  if (index > -1) {
    favoriteList.splice(index, 1)
  } else {
    favoriteList.push(id)
  }
  storage.set(FAVORITE_ITEM_LIST, favoriteList)
  return favoriteList
}
