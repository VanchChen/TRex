import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

const trexLeftX      = 1508
const trexRightX     = 1596
const trexStay       = 1332
const trexGameOver   = 1684

const groundY = screenHeight / 5 * 3
const jumpY   = 20
const jumpDuration = 1000  //毫秒
const initialVelocity = -12

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(trexLeftX, 2, 88, 92, 90, groundY, 88, 92)

    this.isJumping = false

    this.updateCollideRects()
  }

  update() {
    if (this.isJumping) {
      //跳跃动画
      this.y += Math.round(this.velovity)
      this.velovity += 0.6
      if (this.y < jumpY) {
        if (this.velovity < initialVelocity / 2) {
          this.velovity = initialVelocity / 2
        }
      }
      if (this.y >= groundY) {
        //落地
        this.isJumping = false
        this.y = groundY
      }
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
    if (this.isJumping) return

    this.isJumping = true
    this.velovity = initialVelocity
  
    this.sourceX = trexStay
  }

  gameOver () {
    this.sourceX = trexGameOver
  }
}
