const ctx = document.querySelector('#game').getContext('2d')
let height = document.documentElement.clientHeight - 2
let width = document.documentElement.clientWidth - 2

let map = []
const mapWidth = 100
const mapHeight = 100

for (let i = 0; i < mapHeight * mapWidth; i++){
    map.push(Math.floor(Math.random() * 7) + 3)

}

window.addEventListener('load', () => {
  ctx.canvas.width = width
  ctx.canvas.height = height
})

window.addEventListener('resize', () => {
  height = document.documentElement.clientHeight - 2
  width = document.documentElement.clientWidth - 2
  ctx.canvas.width = width
  ctx.canvas.height = height
})


const Player = function (x, y) {
  this.x = x
  this.y = y
}

Player.prototype = {
  moveTo: function (x, y) {
    this.x = x
    this.y = y
  }
}

const Viewport = function (x, y, width, height) {
  this.x = x
  this.y = y
  this.width = width
  this.height = height
}

Viewport.prototype = {}

let pointer = {
  x: 0,
  y: 0
}

const spriteSize = 50
const scaledSize = 50

let currentSecond = 0
let frameCount = 0
let framesLastSecond = 0


let player = new Player(100, 100)
let viewport = new Viewport(0, 0, width - 200, height - 200)

function loop() {

  let sec = Math.floor(Date.now() / 1000)
  if(sec != currentSecond) {
    currentSecond = sec
    framesLastSecond = frameCount
    frameCount = 1
  } else {
    frameCount++
  }

  window.requestAnimationFrame(loop)
  // ctx.imageSmoothingEnabled = false
  viewport.y += 1.9

  xMin = Math.floor(viewport.x / scaledSize)
  yMin = Math.floor(viewport.y / scaledSize)
  xMax = Math.ceil((viewport.x + viewport.width) / scaledSize)
  yMax = Math.ceil((viewport.y + viewport.height) / scaledSize)

  for (let y = yMin; y < yMax; y ++) {
    for (let x = xMin; x < xMax; x ++){
      const value = map[y * mapWidth + x]
      const tileX = spriteSize * x - viewport.x + 100
      const tileY = spriteSize * y - viewport.y + 100

      ctx.drawImage(tileSheet, value * spriteSize, 0, spriteSize, spriteSize, tileX, tileY, scaledSize, scaledSize)
    }
  }

  player.moveTo(pointer.x - spriteSize / 2, pointer.y - spriteSize / 2)
 
  ctx.drawImage(tileSheet, 0, 50, spriteSize, spriteSize, player.x, player.y, scaledSize, scaledSize)
  ctx.strokeStyle = '#ffffff'
  ctx.rect(100, 100, viewport.width, viewport.height)
  ctx.stroke()
  ctx.fillStyle = '#ffffff'

  ctx.fillRect(100, 110, 80, 30)
  ctx.fillStyle = '#ff0000'

  ctx.font = 'bold 20px serif'
  ctx.fillText('FPS: ' + framesLastSecond, 110, 130)
}


const tileSheet = new Image()
tileSheet.addEventListener('load', (ev) => loop())
tileSheet.src = './spritesheet.png'

ctx.canvas.addEventListener('click', (ev) => {
  pointer.x = ev.pageX
  pointer.y = ev.pageY
})
