/**
 * 计算发布时间距离当前时间的差值，返回描述性字符串，比如'14小时前','1天前'
 * @param postDate string
 */
const countTime = (postDate) => {
  let str = ''
  let postTime = Date.parse(postDate.replace(/-/g, '/'))
  let currentTime = new Date().getTime()
  let duration = currentTime - postTime
  str = _formatDuration(duration)
  return str
}

function _formatDuration (duration) {
  let num = null
  if (duration <= 60 * 1000) return '1分钟内'
  if (duration > 60 * 1000 && duration <= 60 * 60 * 1000) {
    num = Math.floor(duration / (60 * 1000)) | 0
    return `${num}分钟前`
  }
  if (duration > 60 * 60 * 1000 && duration <= 24 * 60 * 60 * 1000) {
    num = (duration / (60 * 60 * 1000)) | 0
    return `${num}小时前`
  }
  if (duration > 24 * 60 * 60 * 1000 && duration <= 30 * 24 * 60 * 60 * 1000) {
    num = (duration / (24 * 60 * 60 * 1000)) | 0
    return `${num}天前`
  }
  if (duration > 30 * 24 * 60 * 60 * 1000 && duration <= 12 * 30 * 24 * 60 * 60 * 1000) {
    num = (duration / (30 * 24 * 60 * 60 * 1000)) | 0
    return `${num}月前`
  }
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
// function GetYesterdayDate (currentDay, subtractionDayCount) {
//   let temp = new Date(Date.parse(currentDay.replace(/-/g, '/')))
//   temp.setDate(temp.getDate() - subtractionDayCount) // 获取减去subtractionDayCount天后的日期
//   let year = temp.getFullYear()
//   let month = padString((temp.getMonth() + 1).toString(), 2, 0)
//   var day = padString(temp.getDate().toString(), 2, 0)
//   console.log(`${year}-${month}-${day}`)
//   return `${year}-${month}-${day}`
// }
export {
  countTime,
  findIndexInArray,
  getCurrentDate,
  padString
}
