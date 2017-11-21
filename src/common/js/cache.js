// 存放localstorage本地存储的一些数据
import storage from 'good-storage'
import {findIndexInArray} from 'common/js/util'
import {createAuthor} from 'common/js/class/author'
const STORE_MUSIC_LIST = '__MUSIC_STORE_LIST__'
const FAVORITE_ITEM_LIST = '__FAVORITE_ITEM_LIST__'
const WATCH_AUTHOR_LIST = '__WATCH_AUTHOR_LIST__'
// 获取用户收藏的歌单
export function getStoreMusicList () {
  let storeMusicList = storage.get(STORE_MUSIC_LIST, [])
  return storeMusicList
}
// 设置用户收藏的歌单
export function setStoreMusicList (song) {
  let storeMusicList = storage.get(STORE_MUSIC_LIST, [])
  let index = storeMusicList.findIndex((item) => {
    return item.id === song.id
  })
  if (index > -1) {
    storeMusicList.splice(index, 1)
  } else {
    storeMusicList.push(song)
  }
  storage.set(STORE_MUSIC_LIST, storeMusicList)
  return storeMusicList
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
//  获取用户关注的作者列表
export function getWatchAuthorList () {
  let watchAuthorList = storage.get(WATCH_AUTHOR_LIST, [])
  return watchAuthorList
}
// 设置用户关注的作者列表
export function setWatchAuthorList (author) {
  let watchAuthorList = storage.get(WATCH_AUTHOR_LIST, [])
  let index = watchAuthorList.findIndex((item) => {
    return item.id === author.user_id
  })
  if (index > -1) {
    watchAuthorList.splice(index, 1)
  } else {
    watchAuthorList.push(createAuthor(author))
  }
  storage.set(WATCH_AUTHOR_LIST, watchAuthorList)
  return watchAuthorList
}
