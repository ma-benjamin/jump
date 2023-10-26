const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const map = new Map({
    map: map1
})

const player = new Player({
    position: {
        x: 20,
        y: 100,
    },
    map: map,
    imageSrc: './img/idle-right.png',
    frameRate: 4,
    animations: mushroom_animations,
    static: false
})

const bkgimgh = 22 * 16

const camera = {
    position: {
      x: 0,
      y: -bkgimgh + scaledCanvas.height,
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)

    player.map.update()

    player.update()

    if ( player.charge > 10) {
        if (player.lastDirection == 'left') player.switchSprite('ChargeLeft')
        else player.switchSprite('Charge')
        
    } else if (player.velocity.y === 0) {
        if (player.lastDirection == 'left') player.switchSprite('IdleLeft')
        else player.switchSprite('Idle')
    } else if (player.velocity.y != 0) {
        if (player.lastDirection == 'left') player.switchSprite('AirLeft')
        else player.switchSprite('Air')
        if (player.velocity.y > 0) {
            player.panUp({ canvas, camera })
            console.log("falling")
        } else {
            player.panDown({ canvas, camera })
        }
    }
    

    c.restore()
}

animate()