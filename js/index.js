const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let current_map = maps['level3']

let level = current_map.map

const player = new Player({
    position: current_map.start_position,
    map: level,
    imageSrc: './img/mushroom/idle-right.png',
    frameRate: 4,
    animations: mushroom_animations,
    static: false
})

canvas.width = 1024
canvas.height = 50 * 16
const bkgimgh = 16 * level.map.length

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const camera = {
    position: {
      x: -256,
      y: -bkgimgh + scaledCanvas.height,
    }
}

let background = current_map.image

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
        } else {
            player.panDown({ canvas, camera })
        }
    }
    if (player.velocity.x != 0) {
        player.panHorizontal({ canvas, camera })
    }
    
    c.restore()

    if (player.position.x > 60 && player.position.y < 189 && player.position.x < 160) {
        c.font = "30px Comic Sans MS";
        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText("You Win!", canvas.width/2, canvas.height/4);
        // player.switchMap('level2')
    }
    

    
}

console.log(level.map)

animate()