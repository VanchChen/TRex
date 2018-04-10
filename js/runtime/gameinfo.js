import Sprite from '../base/sprite'
import DataBus from '../databus'
let databus = new DataBus()

const screenWidth  = window.innerWidth
const screenHeight = window.innerHeight

const maxPower = 6

export default class GameInfo {
  constructor() {
    this.nums = []
    for (var i = 0; i < maxPower; i++) {
      var icon = new NumberIcon(0, 0, 20, 24, 10 + i * 20, 10, 120 / maxPower, 24)
      icon.reset(0)
      this.nums.push(icon)
    }
  }

  update() {
    var remain = databus.score
    for (var i = 0; i < maxPower; i++) {
      var num = Math.floor(remain / Math.pow(10, maxPower - 1 - i))
      this.nums[i].reset(num)
      remain = remain - num * Math.pow(10, maxPower - 1 - i)
    }
  }

  render(ctx) {
    this.nums.forEach((item) => {
      item.render(ctx)
    })
  }
}

class NumberIcon extends Sprite {
  reset(num) {
    this.num = num

    this.sourceX = num * 20 + 949
  }
}

