import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth   = window.innerWidth
const screenHeight  = window.innerHeight

const shortX  = 441
const shortWidth  = 34
const shortHeight = 71
const shortCount  = 6

const longX       = 647
const longWidth   = 50 
const longHeight  = 95
const longCount   = 4

const largeX      = 845
const largeWidth  = 102

let databus = new DataBus()

export default class Cactus extends Sprite {
  constructor() {
    super(shortX, 2, shortWidth, shortHeight, screenWidth + shortWidth, screenHeight / 2 + 94 - shortHeight, shortWidth, shortHeight)
    this.reset()
  }

  reset() {
    //随机一个仙人掌图案 仙人掌族群概率相对低一点，为20%
    var choise = Math.random()
    if (choise <= 0.4) {
      //选择了小仙人掌
      this.sourceX = Math.floor(Math.random() * shortCount) * shortWidth + shortX
      this.sourceWidth = shortWidth
      this.sourceHeight = shortHeight
    } else if (choise <= 0.8) {
      //选择了大仙人掌
      this.sourceX = Math.floor(Math.random() * longCount) * longWidth + longX
      this.sourceWidth = longWidth
      this.sourceHeight = longHeight
    } else {
      //选中了族群
      this.sourceX = largeX
      this.sourceWidth = largeWidth
      this.sourceHeight = longHeight
    }
    
    this.width = this.sourceWidth
    this.height = this.sourceHeight
    this.y = screenHeight / 2 + 94 - this.height
    this.x = screenWidth + this.width
    this.visible = true
  }

  update(speed) {
    this.x -= speed
    if (this.x + this.width <= 0) {
      databus.removeCactus(this)
    }
  }
}