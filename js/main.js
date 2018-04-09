import BackGround from './runtime/background'
import Player from './player/index'
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

    // 维护当前requestAnimationFrame的id
    this.aniId = 0
    this.bg = new BackGround()
    this.trex = new Player()

    this.touchHandler = this.touchEventHandler.bind(this)
    canvas.addEventListener('touchstart', this.touchHandler) 

    this.restart()
  }

  restart() {
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
  }

  touchEventHandler(e) {
    // e.preventDefault()
    // let x = e.touches[0].clientX
    // let y = e.touches[0].clientY
    
    this.trex.jump()
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
}
