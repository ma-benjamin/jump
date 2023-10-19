const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 768

const map = new Map({
    map: map1
})

const player = new Player({
    position: {
        x: 0,
        y: 100,
    },
    map: map
})

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    c.save()
    c.scale(4, 4)

    player.map.update()

    player.update()
    

    c.restore()
}

animate()