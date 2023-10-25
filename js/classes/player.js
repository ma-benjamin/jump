class Player extends Sprite{
    constructor ({position, 
                  map,
                  imageSrc,
                  frameRate,
                  scale = 1/52,
                  animations}) {

        super({ imageSrc, frameRate, scale })
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.map = map

        this.bounce = false
        this.gravity = 0.25

        this.charge = 8

        this.animations = animations
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].imageSrc
      
            this.animations[key].image = image
        }

        this.lastDirection = 'right'
        this.hitbox = {
            position: {
                x: this.position.x + 22,
                y: this.position.y,
            },
            width: 24,
            height: 23,
        }
    }

    update() {
        this.updateFrames()
        this.updateHitbox()


        //show box
        // c.fillStyle = 'rgba(0, 0, 255, 0.2)'
        // c.fillRect(this.position.x,
        //             this.position.y,
        //             this.width,
        //             this.height)

        //show hitbox
        // c.fillStyle = 'rgba(255, 0, 0, 0.2)'
        // c.fillRect(this.hitbox.position.x,
        //             this.hitbox.position.y,
        //             this.hitbox.width,
        //             this.hitbox.height)

        this.draw()
        this.position.x += this.velocity.x
        this.updateHitbox()
        if ( this.inBound() ) {
            this.map.horizontal_collisions(this)
        }
        this.updateHitbox()
        this.applyGravity()
        this.updateHitbox()
        if ( this.inBound() ) {
            this.map.vertical_collisions(this)
        }
        

        this.chargeJump()

        if ( player.charge > 10) {
            if (player.lastDirection == 'left') player.switchSprite('ChargeLeft')
            else player.switchSprite('Charge')
            
        } else if (player.velocity.y === 0) {
            if (player.lastDirection == 'left') player.switchSprite('IdleLeft')
            else player.switchSprite('Idle')
        } else if (player.velocity.y != 0) {
            if (player.lastDirection == 'left') player.switchSprite('AirLeft')
            else player.switchSprite('Air')
        }

        if (!this.bounce) this.horizontalVelocity()
    }

    // draw() {
    //     c.fillStyle = 'rgba(255, 0, 0, 1)'
    //     if ( player.charge < 10) {
    //         c.fillRect(this.position.x,
    //             this.position.y,
    //             this.width,
    //             this.height)
    //     } else if ( this.charge < 20 ) {
    //         c.fillRect(this.position.x,
    //             this.position.y + 8,
    //             this.width,
    //             this.height - 8)
    //     } else {
    //         c.fillRect(this.position.x,
    //             this.position.y + 12,
    //             this.width,
    //             this.height - 12)
    //     }
    // }

    chargeJump() {
        if (keys.w.pressed && this.charge < 60 && this.velocity.y == 0) {
            this.charge += 1
        }
        if ((this.charge - 10) % 25 === 0) this.pushFrame()
    }

    horizontalVelocity() {
        if ( this.velocity.y === 0) return
        if (keys.d.pressed) {
            player.velocity.x = 3
        } else if (keys.a.pressed) {
            player.velocity.x = -3
        }
    }

    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }

    inBound() {
        return this.hitbox.position.x >= 0 && this.hitbox.position.x + this.hitbox.width <= canvas.width / 4 &&
        this.hitbox.position.y >= 0 && this.hitbox.position.y + this.hitbox.height <= canvas.height / 4
    }

    reset() {
        this.position = {
            x: 0,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        },
        this.bounce = 0
        this.charge = 8
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 11,
                y: this.position.y + 12,
            },
            width: 24,
            height: 23,
        }
    }

    switchSprite(key) {
        if (this.image === this.animations[key].image || !this.loaded) return
        if (key == "FullJump") console.log("jumped")
        console.log(key)
        this.currentFrame = 0
        this.image = this.animations[key].image
        this.frameRate = this.animations[key].frameRate
        this.frameBuffer = this.animations[key].frameBuffer
        this.still = this.animations[key].still

    }

    jumping() {
        this.pushFrame()
    }
}