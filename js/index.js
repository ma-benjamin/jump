const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 15 * 16

const scaledCanvas = {
    width: 1024,
    height: 768
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

const camera = {
    position: {
      x: 0,
      y: -canvas.height + scaledCanvas.height,
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
    

    c.restore()
}

animate()