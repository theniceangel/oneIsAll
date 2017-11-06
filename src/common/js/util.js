/**
 * 计算发布时间距离当前时间的差值，返回描述性字符串，比如'当天','11月3日'
 * @param postDate string
 */
const countTime = (postDate) => {
  let str = ''
  let postTime = postDate.split(' ')[0]
  if (postTime === getCurrentDate()) {
    str = '今天'
  } else {
    let month = postDate.split(' ')[0].split('-')[1]
    let day = postDate.split(' ')[0].split('-')[2]
    str = `${month}月${day}日`
  }
  return str
}

// 寻找数组中元素的下标
function findIndexInArray (arr, target) {
  let index = arr.findIndex((item) => {
    return item === target
  })
  return index
}
// 字符串的补白函数
function padString (target, targetLength, padString) {
  return target.padStart(targetLength, padString)
}
// 获取当天的日期,返回格式为yyyy-mm-dd
function getCurrentDate () {
  let date = new Date()
  let year = date.getFullYear()
  let month = padString((date.getMonth() + 1).toString(), 2, 0)
  let day = padString(date.getDate().toString(), 2, 0)
  return `${year}-${month}-${day}`
}
// 获取昨天的日期,返回格式为yyyy-mm-dd
function GetYesterdayDate (currentDay, subtractionDayCount) {
  let temp = new Date(Date.parse(currentDay.replace(/-/g, '/')))
  temp.setDate(temp.getDate() - subtractionDayCount) // 获取减去subtractionDayCount天后的日期
  let year = temp.getFullYear()
  let month = padString((temp.getMonth() + 1).toString(), 2, 0)
  var day = padString(temp.getDate().toString(), 2, 0)
  return `${year}-${month}-${day}`
}
/**
 * raf polyfill
 */
const DEFAULT_INTERVAL = 1000 / 60
let requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    // 所有都不支持，用setTimeout兼容
    function (callback) {
      return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL))  // make interval as precise as possible.
    }
})()

/**
 * cancel raf polyfill
 */
let cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    function (id) {
      window.clearTimeout(id)
    }
})()
export {
  countTime,
  findIndexInArray,
  getCurrentDate,
  padString,
  GetYesterdayDate,
  requestAnimationFrame,
  cancelAnimationFrame
}
