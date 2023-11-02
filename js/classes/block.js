class Block {
    constructor({position, height = 16}) {
        this.position = position,
        this.width = 16
        this.height = height
    }

    draw() {
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Platform {
    constructor({position, height = 16}) {
        this.position = position,
        this.width = 16
        this.height = height
    }

    draw() {
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}