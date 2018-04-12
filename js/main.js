import Sprite from './base/sprite'
import BackGround from './runtime/background'
import GameInfo from './runtime/gameinfo'
import Music from './runtime/music'
import Player from './player/index'
import Cactus from './npc/cactus'
import Cloud from './npc/cloud'
import DataBus from './databus'

let ctx = canvas.getContext('2d')
let databus = new DataBus()

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    canvas.width = screenWidth
    canvas.height = screenHeight

    this.bg = new BackGround()
    this.info = new GameInfo()
    this.trex = new Player()
    this.music = new Music()

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

    //画背景
    this.bg.render(ctx)
    //画☁️
    databus.cloud.forEach((item) => {
      item.render(ctx)
    })
    //画🌵
    databus.cactus.forEach((item) => {
      item.render(ctx)
    })
    //画小恐龙
    this.trex.render(ctx)
    //画分数
    this.info.render(ctx)
  }

  // 游戏逻辑更新主函数
  update() {
    if (databus.gameOver)
      return;

    databus.update()
    this.bg.update(databus.speed)
    this.trex.update()
    this.info.update()

    //此处要倒序，如果顺序遍历，在删除第一个元素后，第二个会被跳过
    for (var i = databus.cactus.length - 1; i >= 0; i--) {
      databus.cactus[i].update(databus.speed)
    }
    for (var i = databus.cloud.length - 1; i >= 0; i--) {
      databus.cloud[i].update()
    }

    //生成各种精灵
    this.generateCactus()
    this.generateCloud()

    //碰撞检测
    this.collisionDetection()
  }

  touchEventHandler(e) {
    if (databus.gameOver === false) {
      this.trex.jump()
      this.music.playPress()
    } else {
      this.restart()
    }
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
    } else {
      this.gameOverHint.render(ctx)
      this.gameOverHintBtn.render(ctx)
      this.music.playHit()
    }
  }

  //生成新的仙人掌
  generateCactus(){
    if (databus.cactus.length > 0) {
      //取上一个仙人掌
      var cactus = databus.cactus[databus.cactus.length - 1]
      if (cactus.distance < databus.frame) {
        this.addCactus()
      }
    } else {
      this.addCactus()
    }
  }
  addCactus() {
    var cactus = databus.pool.getItemByClass('cactus', Cactus)
    cactus.reset()
    databus.cactus.push(cactus)
  }

  //生成新的云
  generateCloud() {
    var needAddCloud = false
    if (databus.cloud.length === 0) {
      needAddCloud = true
    } else if (databus.frame >= databus.cloud[databus.cloud.length - 1].distant) {
      needAddCloud = true
    }
    if (needAddCloud) {
      var cloud = databus.pool.getItemByClass('cloud', Cloud)
      cloud.reset()
      databus.cloud.push(cloud)
    }
  }

  // 全局碰撞检测
  collisionDetection() {
    if (databus.cactus.length > 0 && 
      databus.cactus[0].isCollidedWith(this.trex.collideRects)) {
      this.gameOver()
    }
  }

  gameOver() {
    databus.gameOver = true
    this.trex.gameOver()

    //展示结束提示
    if (!this.gameOverHint) {
      this.gameOverHint = new Sprite(950, 28, 382, 24, screenWidth / 2 - 382 / 2, screenHeight / 3, 382, 24)
      this.gameOverHintBtn = new Sprite(0, 2, 68, 64, screenWidth / 2 - 68 / 2, screenHeight / 5 * 3, 68, 64)
    }
  }
}
