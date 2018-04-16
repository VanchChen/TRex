## 项目介绍

第一次试水微信小游戏开发，使用微信开发者工具开发，按照默认Demo的样式根据Chrome离线游戏的方式实现了一遍。

## 源码目录介绍
```
./js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
|	├── cactus.js						   // 仙人掌类
│   └── cloud.js                           // 云类
├── player
│   └── index.js                           // 小恐龙类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```