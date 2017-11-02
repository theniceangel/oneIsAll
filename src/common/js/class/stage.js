import createSprite from './sprite'
// 舞台
export default class Stage {
  constructor (parent) {
    this.spriteQuene = []
    this.parent = parent
  }
  addSprite (count) {
    for (let i = 0; i < count; i++) {
      this.spriteQuene.push(createSprite({
        radio: 3,
        backgroundColor: 'white',
        left: 0,
        top: 15
      }, this.parent))
    }
    return this
  }
  paintSprite () {
    setInterval(() => {
      let firstSprite = this.spriteQuene.shift()
      firstSprite.setTransform()
      this.spriteQuene.push(firstSprite)
    }, 80)
  }
  removeAllSprite () {
    this.parent.innerHTML = ''
  }
}

