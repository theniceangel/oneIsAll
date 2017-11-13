import {getStoreList} from 'common/js/cache'
import {getCurrentDate} from 'common/js/util'
export default {
  currentDate: getCurrentDate(), // 用来存放最近10天的id,根据id去查首页的信息
  playList: [], // 存放要播放的歌单
  currentPlayIndex: 0, // 正在播放的歌曲的索引
  playingState: false, // 播放状态
  playingMode: 0, // 0为顺序播放，1为循环播放
  storeList: getStoreList(), // 用户收藏的歌单
  shareItem: [] // 当前分享
}
