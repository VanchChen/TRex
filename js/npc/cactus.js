import Sprite from '../base/sprite'
import DataBus from '../databus'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const leftX = 440
const width = 34
const height = 70
const count = 6

let databus = new DataBus()

export default class Cactus extends Sprite {
  constructor() {
    super(leftX, 2, width, height, screenWidth + width, screenHeight / 2 + 94 - height, width, height)
    this.reset()
  }

  reset() {
    this.x = screenWidth + width

    //随机一个仙人掌图案
    this.sourceX = Math.floor(Math.random() * count) * width + leftX

    this.visible = true
  }

  update(speed) {
    this.x -= speed
    if (this.x + width <= 0) {
      databus.removeCactus(this)
    }
  }
}