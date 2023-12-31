class Sprite {
    constructor({position, 
                 imageSrc, 
                 frameRate = 1, 
                 frameBuffer = 12, 
                 scale = 1, 
                 still = false}) {
        this.position = position
        this.scale = scale
        this.loaded = false
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = (this.image.width/ this.frameRate) * this.scale
            this.height = (this.image.height) * this.scale
        }
        this.image.src = imageSrc
        this.frameRate = frameRate
        this.currentFrame = 0
        this.frameBuffer = frameBuffer
        this.elapsedFrames = 0
        this.still = still
    }

    draw() {
        if (!this.image) return

        const cropbox = {
            position: {
                x: this.currentFrame * (this.image.width / this.frameRate),
                y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
        }

        c.drawImage(this.image,
                    cropbox.position.x,
                    cropbox.position.y,
                    cropbox.width,
                    cropbox.height,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.height)
    }

    update() {
        this.draw()
        this.updateFrames()
    }

    updateFrames() {
        this.elapsedFrames++
        
        if (this.elapsedFrames % this.frameBuffer === 0 && this.still == false) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }

    pushFrame() {
        if (this.currentFrame < this.frameRate - 1) {
            this.currentFrame++
        }
    }
}