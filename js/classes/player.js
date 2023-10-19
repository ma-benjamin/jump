class Player {
    constructor ({position, map}) {
        this.position = position
        this.velocity = {
            x: 0,
            y: 0
        }
        this.map = map

        this.height = 30
        this.width = 30

        this.bounce = false
        this.gravity = 0.25

        this.charge = 10
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.horizontalCollisions()
        if ( this.position.x >= 0 && this.position.x + this.width <= canvas.width / 4 &&
             this.position.y >= 0 && this.position.x + this.height <= canvas.height / 4) {
            this.map.horizontal_collisions(this)
        }
        this.applyGravity()
        this.verticalCollisions()
        if ( this.position.x >= 0 && this.position.x + this.width <= canvas.width / 4 &&
             this.position.y >= 0 && this.position.x + this.height <= canvas.height / 4) {
            this.map.vertical_collisions(this)
        }
        this.chargeJump()

        if (!this.bounce) this.horizontalVelocity()
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 1)'
        if ( player.charge < 35) {
            c.fillRect(this.position.x,
                this.position.y,
                this.width,
                this.height)
        } else if ( this.charge < 60 ) {
            c.fillRect(this.position.x,
                this.position.y + 10,
                this.width,
                this.height - 10)
        } else {
            c.fillRect(this.position.x,
                this.position.y + 20,
                this.width,
                this.height - 20)
        }
    }

    chargeJump() {
        if (keys.w.pressed && this.charge < 60) {
            this.charge += 1
        }
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

    verticalCollisions() {
        // bottom of screen
        if ( this.position.y + this.height >= canvas.height / 4 ) {
            if (this.velocity.y > 3 && player.bounce) {
                // bounce on the ground aftering falling too fast
                this.velocity.y = -2/5 * this.velocity.y
            }
            if (this.velocity.y > 0) {
                this.velocity.y = 0
                this.velocity.x = 0
                this.bounce = false
                this.position.y = canvas.height / 4 - this.height - 0.01
                console.log(this.position)
            }
        }

        // top of screen
        // if ( this.position.y <= 0 ) {
        //     if (this.velocity.y < 0) {
        //         this.velocity.y = -1 * this.velocity.y
        //         this.velocity.x = 0
        //         this.bounce = false
        //         this.position.y = canvas.height / 4 - this.height - 0.01
        //         console.log(this.position)
        //     }
        // }
    }

    horizontalCollisions() {
        if(this.position.x <= 0 && this.velocity.x < 0) {
            this.velocity.x = -1/2 * this.velocity.x
            this.position.x = 0.01
            this.bounce = true
        } else if (this.position.x + this.width >= canvas.width / 4 &&
                    this.velocity.x > 0) {
            this.velocity.x = -1/2 * this.velocity.x
            this.position.x = canvas.width / 4 - this.width - 0.01
            this.bounce = true
        }
    }
}