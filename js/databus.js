import Pool from './base/pool'

let instance

/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pool = new Pool()
    this.image = new Image()
    this.image.src = 'images/sprite.png'

    this.reset()
    //云不清空
    this.cloud = []
  }

  reset() {
    this.frame      = 0
    this.score      = 0
    this.speed      = 6
    this.cactus     = []
    this.gameOver   = false
  }

  update() {
    this.speed += 0.003
    this.speed = Math.min(this.speed, 13)

    this.score = Math.floor(this.frame / 6)
  }
}
