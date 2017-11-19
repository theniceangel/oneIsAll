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
// 从某个数组里面随机取出不重复的n个元素
function getNoneDuplicateFromArr (arr, count) {
  let ret = [] // 返回的不重复的n个元素组成的数组
  let copy = arr.slice()
  if (!Array.isArray(arr) || arr === undefined) {
    console.error('the first parameter must be an array')
    return ret
  }
  if (typeof count === 'string') {
    count = Number(count)
  }
  if (arr.length < count) {
    console.error('the second parameter can not exceed the length of array')
    return ret
  }
  function getNoneDuplicateEle (copy, count) {
    let result = []
    for (let i = 0; i < count; i++) {
      let random = Math.random() * copy.length | 0
      result.push(copy[random])
      copy.splice(random, 1)
    }
    return result
  }
  ret = getNoneDuplicateEle(copy, count)
  return ret
}
// css能力检测
let elementStyle = document.createElement('p').style
let vendor = (function getVendor () {
  const prefixMap = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transfrom'
  }
  for (let key in prefixMap) {
    if (prefixMap.hasOwnProperty(key)) {
      if (elementStyle[prefixMap[key]] !== null) {
        if (key === 'standard') {
          key = ''
        }
        return key
      }
    }
  }
  return false
})()
function getPrefixStyle (css) {
  if (vendor === false) {
    return false
  }
  return vendor + css.charAt(0).toUpperCase() + css.substr(1)
}
export {
  countTime,
  findIndexInArray,
  getCurrentDate,
  padString,
  GetYesterdayDate,
  getNoneDuplicateFromArr,
  getPrefixStyle
}
