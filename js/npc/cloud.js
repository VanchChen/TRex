import DataBus   from '../databus'
import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

let databus = new DataBus()

export default class Cloud extends Sprite {
  constructor() {
    super(161, 2, 92, 27, 0, 0, 92, 27)

    this.reset()
  }

  reset() {
    this.x = screenWidth + this.width
    this.y = Math.random() * screenHeight / 2 + 20

    this.distant = databus.frame + Math.floor(Math.random() * 400) + 50

    this.visible = true
  }

  update() {
    this.x -= 3
    if (this.x + this.width <= 0) {
      let temp = databus.cloud.shift()
      temp.visible = false
      databus.pool.recover('cloud', temp)
    }
  }
}
