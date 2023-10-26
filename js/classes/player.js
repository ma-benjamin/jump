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

        this.camerabox= {
            position: {
                x: this.position.x,
                y: this.position.y - 20,
            },
            width: 1024,
            height: 256,
        }
    }

    update() {
        this.updateFrames()
        this.updateHitbox()
        this.updateCamerabox()

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

        // draws camera box
        c.fillStyle = 'rgba(0, 0, 255, 0.2)'
        c.fillRect(this.camerabox.position.x, 
                   this.camerabox.position.y, 
                   this.camerabox.width, 
                   this.camerabox.height)

        this.draw()
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.map.horizontal_collisions(this)
        this.updateHitbox()
        this.applyGravity()
        this.updateHitbox()
        this.map.vertical_collisions(this)
        

        this.chargeJump()

        if (!this.bounce) this.horizontalVelocity()
    }

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

    updateCamerabox() {
        this.camerabox= {
          position: {
            x: 0,
            y: this.position.y,
          },
          width: canvas.width,
          height: 100,
        }
    }

    panUp({canvas, camera}) {
        if (this.camerabox.position.y + this.camerabox.height + this.velocity.y >= 22 * 16) return

        if (this.camerabox.position.y + this.camerabox.height >= 
            canvas.height / 4 + Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y
        }
    }

    panDown({canvas, camera}) {
        if (this.camerabox.position.y + this.velocity.y <= 0) {
            return
        }
        if (this.camerabox.position.y <= Math.abs(camera.position.y)) {
            camera.position.y -= this.velocity.y
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
}