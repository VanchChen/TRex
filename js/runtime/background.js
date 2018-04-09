import Sprite from '../base/sprite'
import DataBus from '../databus'
let databus = new DataBus()

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor() {
    super(2, 104, 900, 24, 0, screenHeight / 3 * 2, screenWidth, 24)

    this.secondX = 0
    this.showBlend = false;
  }

  update(speed) {
    if (this.showBlend == false) {
      this.sourceX += speed
      var maxOffset = 1600 - screenWidth
      if (this.sourceX >= maxOffset) {
        //第一张滚到了尾巴
        this.x = maxOffset - this.sourceX
        this.sourceX = maxOffset
        this.secondX = this.x + screenWidth
        this.showBlend = true
      }
    } else {
      this.x -= speed / 1860 * (screenWidth * 2)
      this.secondX = this.x + screenWidth
      if (this.secondX <= 0) {
        this.x = 0
        this.sourceX = 2 - this.secondX
        this.showBlend = false
      }
    }
  }

  render(ctx) {
    ctx.drawImage(
      databus.image,
      this.sourceX,
      this.sourceY,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
    if (this.showBlend) {
      ctx.drawImage(
        databus.image,
        2,
        this.sourceY,
        this.sourceWidth,
        this.sourceHeight,
        this.secondX,
        this.y,
        this.width,
        this.height
      )
    }
  }
}
