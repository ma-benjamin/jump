class Block {
    constructor({position, height = 16}) {
        this.position = position
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
        this.position = position
        this.width = 16
        this.height = height
    }

    draw() {
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

class Slope {
    constructor({position, height = 16, corner}) {
        this.position = position
        this.width = 16
        this.height = height
        this.corner = corner
    }

    draw() {
        c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        switch (this.corner) {
            case 'topL':
                c.fillStyle = 'rgba(255, 0, 0, 0.5)'
                c.beginPath()
                c.moveTo(this.position.x, this.position.y)
                c.lineTo(this.position.x + 16, this.position.y)
                c.lineTo(this.position.x, this.position.y + 16)
                c.fill()
                break
            case 'topR':
                c.fillStyle = 'rgba(0, 255, 0, 0.5)'
                c.beginPath()
                c.moveTo(this.position.x, this.position.y)
                c.lineTo(this.position.x + 16, this.position.y)
                c.lineTo(this.position.x + 16, this.position.y + 16)
                c.fill()
                break
            case 'botL':
                c.fillStyle = 'rgba(0, 0, 255, 0.5)'
                c.beginPath()
                c.moveTo(this.position.x, this.position.y)
                c.lineTo(this.position.x, this.position.y + 16)
                c.lineTo(this.position.x + 16, this.position.y + 16)
                c.fill()
                break
            case'botR':
                c.fillStyle = 'rgba(255, 0, 255, 0.5)'
                c.beginPath()
                c.moveTo(this.position.x + 16, this.position.y)
                c.lineTo(this.position.x + 16, this.position.y + 16)
                c.lineTo(this.position.x, this.position.y + 16)
                c.fill()
                break
        }

    }

    slope_height(object) {
        switch (this.corner) {            
            case 'topL':
                return -object.position.x + this.position.y + this.position.x + this.height
            case 'topR':
                return object.position.x + object.width + this.position.y - this.position.x
            case 'botL':
                return object.position.x + this.position.y - this.position.x
            case'botR':
                return -(object.position.x + object.width) + this.position.y + this.position.x + this.height
        }
    }
}