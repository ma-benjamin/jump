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
    }
  })
  
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            power = player.charge / 4
            console.log(power)
            console.log(player.velocity.x)
            console.log(player.bounce)
            if ( power < 15 ) {
                player.velocity.y = -3/5 * power 
            } else {
                player.velocity.y = -9
            }
            player.charge = 10
            break
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})