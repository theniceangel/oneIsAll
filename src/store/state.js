export default {
  currentPage: 0, // 根据底部导航栏判断处在第几个导航中
  idList: [], // 用来存放最近10天的id,根据id去查首页的信息
  currentDay: 0, // 表示第几天，0代表当天,9代表9天前
  playList: [], // 存放要播放的歌单
  currentPlayIndex: 0, // 正在播放的歌曲的索引
  playingState: false // 播放状态
}
