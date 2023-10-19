class Map {
    constructor({map}) {
        this.map = map;
        this.blocks = []

        map.forEach((row, y) => {
            row.forEach((symbol, x) => {
                if (symbol === 202) {
                    this.blocks.push( 
                        new Block ({
                            position: {
                                x: 16 * x,
                                y: 16 * y,
                            }
                        })
                    )
                }
            })
        })
    }

    draw() {
        this.blocks.forEach((block) => {
            block.draw()
        })
    }

    update() {
        this.draw()
    }

    horizontal_collisions(object) {
        var bot_left = [Math.floor((object.position.y + object.height) / 16),
                        Math.floor(object.position.x / 16)]
        var bot_right = [Math.floor((object.position.y + object.height) / 16),
                         Math.floor((object.position.x + object.width) / 16)]
        var top_left = [Math.floor((object.position.y) / 16),
                         Math.floor(object.position.x / 16)]
        var top_right = [Math.floor((object.position.y) / 16),
                          Math.floor((object.position.x + object.width) / 16)]
                          
        // left side collision
        if (this.map[top_left[0]][top_left[1]] === 202 || 
            this.map[bot_left[0]][bot_left[1]] === 202) {
                if( object.velocity.x < 0) {
                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = (top_left[1] + 1) * 16 + 0.01
                    object.bounce = true
                }
        }

        // right side collision
        if (this.map[top_right[0]][top_right[1]] === 202 || 
            this.map[bot_right[0]][bot_right[1]] === 202) {
                if( object.velocity.x > 0) {
                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = top_right[1] * 16 - object.width - 0.01
                    object.bounce = true
                }
        }
    }

    vertical_collisions(object) {
        var bot_left = [Math.floor((object.position.y + object.height) / 16),
                        Math.floor(object.position.x / 16)]
        var bot_right = [Math.floor((object.position.y + object.height) / 16),
                         Math.floor((object.position.x + object.width) / 16)]
        var top_left = [Math.floor((object.position.y) / 16),
                        Math.floor(object.position.x / 16)]
        var top_right = [Math.floor((object.position.y) / 16),
                         Math.floor((object.position.x + object.width) / 16)]

        // top side collision
        if (this.map[top_left[0]][top_left[1]] === 202 || 
            this.map[top_right[0]][top_right[1]] === 202) {
                if( object.velocity.y < 0) {
                    console.log(object.position)
                    console.log(top_left)
                    console.log("collided")
                    object.velocity.y = -1/4 * object.velocity.y
                    object.position.y = (top_left[0] + 1) * 16 + 0.01
                    this.bounce = true
                    console.log(object.position)
                }
        }

        // bottom side collision
        if (this.map[bot_left[0]][bot_left[1]] === 202 || 
            this.map[bot_right[0]][bot_right[1]] === 202) {
            object.velocity.y = 0
            object.velocity.x = 0
            object.position.y = bot_left[0] * 16 - object.height - 0.01
            object.bounce = false
        }
    }
}