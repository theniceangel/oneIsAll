// 生成右侧悬浮播放按钮的精灵
class Sprite {
  constructor (domOptions = {
    radio: 3,
    backgroundColor: 'white',
    left: 0,
    top: 0
  }, parent = document.body) {
    this.radio = domOptions.radio // 精灵的半径
    this.backgroundColor = domOptions.backgroundColor // 精灵的颜色
    this.left = domOptions.left // 精灵绝对定位的left值
    this.top = domOptions.top // 精灵绝对定位的top值
    this.parent = parent
    this.dom = this.createDom()
  }
  createDom () {
    let dom = document.createElement('div')
    let random = Math.random() * 9 | 0
    dom.style.backgroundColor = this.backgroundColor
    dom.style.width = dom.style.height = this.radio + 'px'
    dom.style.borderRadius = '100%'
    dom.style.position = 'absolute'
    dom.style.left = this.left + 'px'
    dom.style.top = this.top + 'px'
    dom.style.opacity = ({
      0: '0.1',
      1: '0.2',
      2: '0.3',
      3: '0.4',
      4: '0.5',
      5: '0.6',
      6: '0.7',
      7: '0.8',
      8: '0.9'
    })[random]
    this.parent.append(dom)
    return dom
  }
  // 设置css3的样式,并且在transition结束之后会重置样式
  setTransform () {
    let y = ((Math.random() * 15) | 0) % 2 === 0 ? ((Math.random() * 15) | 0) : -((Math.random() * 15) | 0)
    this.dom.style.transform = `translateX(40px) translateY(${y}px)`
    this.dom.style.transition = 'all 2s linear'
    this.dom.addEventListener('webkitTransitionEnd', () => {
      this.dom.style.transform = `translateX(0)`
      this.dom.style.transition = ''
    })
  }
}
// 工厂函数，只是为了生成精灵
export default function createSprite (options, parent) {
  return new Sprite(options, parent)
}
