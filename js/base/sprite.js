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
   * 两个矩形有相交的部分就是碰撞了
   * 传人矩形数组，元素也是数组，4个数值为x,y,width,height
   */
  isCollidedWith(rects) {
    if (!this.visible || rects.length === 0)
      return false

    var isIntersect = false
    for (var i = 0; i < rects.length - 1; i++) {
      var rect = rects[i]
      if (rect.length != 4) {
        continue
      }
      if (!((rect[0] > (this.x + this.width)) ||
        ((rect[0] + rect[2]) < this.x) ||
        (rect[1] > (this.y + this.height)) ||
        ((rect[1] + rect[3]) < this.y))) {
          //不不相交
          isIntersect = true
          break
        }
    }

    return isIntersect

  }
}
