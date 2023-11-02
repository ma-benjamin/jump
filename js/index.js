const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = (walls.length + 18) * 16

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const map = new Map({
    walls: walls,
    platforms: platforms
})

const player = new Player({
    position: {
        x: 20,
        y: 450,
    },
    map: map,
    imageSrc: './img/mushroom/idle-right.png',
    frameRate: 4,
    animations: mushroom_animations,
    static: false
})

const bkgimgh = 16 * walls.length

const camera = {
    position: {
      x: 0,
      y: -bkgimgh + scaledCanvas.height,
    }
}

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/1.png'
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.save()
    c.scale(4, 4)
    c.translate(camera.position.x, camera.position.y)
    background.update()

    player.map.update()

    player.update()

    if ( player.charge > 8) {
        if (player.lastDirection == 'left') player.switchSprite('ChargeLeft', false)
        else player.switchSprite('Charge', false)
        
    } else if (player.velocity.y === 0) {
        if (player.lastDirection == 'left') player.switchSprite('IdleLeft', true)
        else player.switchSprite('Idle', true)
    } else if (player.velocity.y != 0) {
        if (player.lastDirection == 'left') player.switchSprite('AirLeft', true)
        else player.switchSprite('Air', true)
        if (player.velocity.y > 0) {
            player.panUp({ canvas, camera })
            console.log("falling")
        } else {
            player.panDown({ canvas, camera })
        }
    }
    

    c.restore()
}


console.log(walls.length)
console.log(walls[0].length)
console.log(platforms.length)
console.log(platforms[0].length)
animate()