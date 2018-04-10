import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const trexLeftX      = 1508
const trexRightX     = 1596
const trexStay       = 1332
const trexGameOver   = 1684

const groundY = screenHeight / 2
const jumpY   = screenHeight / 6
const jumpDuration = 45

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(trexLeftX, 2, 88, 92, 90, groundY, 88, 92)

    this.jumpInterval = 0

    this.updateCollideRects()
  }

  update() {
    if (this.jumpInterval > 0) {
      //跳跃动画
      if (this.jumpInterval > jumpDuration / 2) {
        //上升动画
        this.velovity -= 0.2
        this.y -= this.velovity
      } else {
        //下降动画
        this.y += this.velovity
        this.velovity += 0.2
      }

      this.jumpInterval--
    } else {
      //跑步动画
      var index = databus.frame % 10
      if (index == 5) {
        this.sourceX = trexRightX
      } else if (index == 0) {
        this.sourceX = trexLeftX
      }
    }

    this.updateCollideRects()
  }

  updateCollideRects() {
    //目前碰撞区域为2个，细分为头和身体两个矩形
    this.collideRects = [[this.x + 40, this.y, this.width - 45, 38], 
                        [this.x + 22, this.y + 38, 32, this.height - 38]]
  }

  jump() {
    if (this.jumpInterval > 0) return

    this.jumpInterval = jumpDuration - 1
    this.velovity = (groundY - jumpY) / (jumpDuration / 3)
  
    this.sourceX = trexStay
  }

  gameOver () {
    this.sourceX = trexGameOver
  }
}
