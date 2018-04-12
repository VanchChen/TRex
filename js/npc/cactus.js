import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth   = window.innerWidth
const screenHeight  = window.innerHeight

const shortX  = 441
const shortWidth  = 34
const shortHeight = 71

const longX       = 647
const longWidth   = 50 
const longHeight  = 95

const groundY = screenHeight / 5 * 3

let databus = new DataBus()

export default class Cactus extends Sprite {
  constructor() {
    super(shortX, 2, shortWidth, shortHeight, screenWidth + shortWidth, groundY + 94 - shortHeight, shortWidth, shortHeight)
    this.reset()
  }

  reset() {
    //随机一个仙人掌图案
    var choise = Math.floor(Math.random() * 2)
    var size = 1
    if (choise) {
      //选择了小仙人掌
      if (databus.speed > 4) {
        //1到3个仙人掌
        size = Math.floor(Math.random() * 3) + 1
      }
      this.sourceX = (shortWidth * size) * (0.5 * (size - 1)) + shortX
      this.sourceWidth = shortWidth * size
      this.sourceHeight = shortHeight
    } else {
      //选择了大仙人掌
      if (databus.speed > 7) {
        //1到3个仙人掌
        size = Math.floor(Math.random() * 3) + 1
      }
      this.sourceX = (longWidth * size) * (0.5 * (size - 1)) + longX
      this.sourceWidth = longWidth * size
      this.sourceHeight = longHeight
    }
    
    this.width = this.sourceWidth
    this.height = this.sourceHeight
    this.y = groundY + 94 - this.height
    this.x = screenWidth + this.width
    this.visible = true

    this.distance = databus.frame + (this.width * databus.speed + 150 * 0.6) / databus.speed
  }

  update(speed) {
    this.x -= speed
    if (this.x + this.width <= 0) {
      let temp = databus.cactus.shift()
      temp.visible = false
      databus.pool.recover('cactus', temp)
    }
  }
}