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
            break
        case 'd':
            keys.d.pressed = true
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
    }
  })
  
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            if (player.velocity.y != 0) break
            keys.w.pressed = false
            power = player.charge / 3
            if ( power < 32/3 ) {
                player.velocity.y = -3/4 * power 
            } else {
                player.velocity.y = -8
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