import BackGround from './runtime/background'
import Player from './player/index'
import Cactus from './npc/cactus'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    this.bg = new BackGround()
    this.trex = new Player()

    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler) 

    this.restart()
  }

  restart() {
    databus.reset()

    this.bindLoop = this.loop.bind(this)

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    this.bg.render(ctx)
    this.trex.render(ctx)

    databus.cactus.forEach((item) => {
      item.render(ctx)
    })

    ctx.fillStyle = "red"
    ctx.font = "20px Arial"

    ctx.fillText(
      databus.frame,
      10,
      30
    )
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    databus.update()
    this.bg.update(databus.speed)
    this.trex.update()

    //此处要倒序，如果顺序遍历，在删除第一个元素后，第二个会被跳过
    for (var i = databus.cactus.length - 1; i >= 0; i--) {
      databus.cactus[i].update(databus.speed)
    }

    this.generateCactus()
    this.collisionDetection()
  }

  touchEventHandler(e) {
    if (databus.gameOver === false) {
      this.trex.jump()
    } else {
      this.restart()
    }
    //databus.gameOver = true
  }

  // 实现游戏帧循环
  loop() {
    databus.frame++

    this.update()
    this.render()

    if (databus.gameOver === false) {
      this.aniId = window.requestAnimationFrame(
        this.bindLoop,
        canvas
      )
    }
  }

  //生成新的仙人掌
  generateCactus(){
    if (databus.frame % (160 - databus.speed * 4) === 0) {
      var cactus = databus.pool.getItemByClass('cactus', Cactus)
      cactus.reset()
      databus.cactus.push(cactus)
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    if (databus.cactus.length > 0 && 
      databus.cactus[0].isCollidedWith(this.trex.collideRects)) {
      databus.gameOver = true
      this.trex.gameOver()
    }
  }
}
