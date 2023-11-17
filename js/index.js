const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = (forest_map.length + 8) * 16

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4,
}

const map = new Map({
    map: forest_map
})

const player = new Player({
    position: {
        x: 30,
        y: 600,
    },
    map: map,
    imageSrc: './img/mushroom/idle-right.png',
    frameRate: 4,
    animations: mushroom_animations,
    static: false
})

const bkgimgh = 16 * forest_map.length

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
    imageSrc: './img/forest_map.png'
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
    
    c.restore()

    if (player.position.x > 60 && player.position.y < 189 && player.position.x < 160) {
        c.font = "30px Comic Sans MS";
        c.fillStyle = "white";
        c.textAlign = "center";
        c.fillText("You Win!", canvas.width/2, canvas.height/4);
        return
    }
    

    
}

console.log(forest_map)

animate()