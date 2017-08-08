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
export {
  countTime,
  findIndexInArray
}
