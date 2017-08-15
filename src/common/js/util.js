
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
  findIndexInArray,
  getCurrentDate,
  padString
}
