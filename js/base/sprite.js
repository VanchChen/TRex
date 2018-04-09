import DataBus from '../databus'
let databus = new DataBus()

/**
 * 游戏基础的精灵类
 */
export default class Sprite {
  constructor(sourceX = 0, sourceY = 0, sourceWidth = 0, sourceHeight = 0, x = 0, y = 0, width = 0, height = 0) {
    this.width  = width
    this.height = height
    this.sourceX = sourceX
    this.sourceY = sourceY

    this.x = x
    this.y = y
    this.sourceWidth = sourceWidth
    this.sourceHeight = sourceHeight

    this.visible = true
  }

  /**
   * 将精灵图绘制在canvas上
   */
  render(ctx) {
    if ( !this.visible )
      return
    
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
  }

  /**
   * 简单的碰撞检测定义：
   * 另一个精灵的中心点处于本精灵所在的矩形内即可
   * @param{Sprite} sp: Sptite的实例
   */
  isCollideWith(sp) {
    let spX = sp.x + sp.width / 2
    let spY = sp.y + sp.height / 2

    if ( !this.visible || !sp.visible )
      return false

    return !!(   spX >= this.x
              && spX <= this.x + this.width
              && spY >= this.y
              && spY <= this.y + this.height  )
  }
}
