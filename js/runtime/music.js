let instance

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor() {
    if ( instance )
      return instance

    instance = this

    this.pressAudio     = new Audio()
    this.pressAudio.src = 'audio/press.mp3'

    this.hitAudio       = new Audio()
    this.hitAudio.scr   = 'audio/hit.mp3'
  }

  playPress() {
    this.pressAudio.currentTime = 0
    this.pressAudio.play()
  }

  playHit() {
    this.hitAudio.currentTime = 0
    this.hitAudio.play()
  }
}
