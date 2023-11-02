const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
  
  }

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            break
        case ' ':
            if (player.velocity.y == 0)
            player.velocity.y = -4
            break
        case 'a':
            keys.a.pressed = true
            player.lastDirection = 'left'
            break
        case 'd':
            keys.d.pressed = true
            player.lastDirection = 'right'
            break
        case 'p':
            var ans = prompt("change map: ")
            player.reset()
            if (ans == "1") {
                player.map = new Map({
                    map: map1
                })
            } else if (ans == "2") {
                console.log("changed to map2")
                player.map = new Map({
                    map: map2
                })
            }
            break
        case 'i':
            console.log("Player Info:")
            console.log("position: " + player.position.x + ", " + player.position.y)
            console.log("velocity: " + player.velocity.x + ", " + player.velocity.y)
            break
    }
  })
  
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            if (player.velocity.y != 0) break
            keys.w.pressed = false
            power = player.charge / 8
            if ( power < 6 ) {
                player.velocity.y = -1 * power
            } else {
                player.velocity.y = -7
            }
            player.charge = 8
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})