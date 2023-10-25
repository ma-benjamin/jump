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
        var bot_left = [Math.floor((object.hitbox.position.y + object.hitbox.height) / 16),
                        Math.floor(object.hitbox.position.x / 16)]
        var bot_right = [Math.floor((object.hitbox.position.y + object.hitbox.height) / 16),
                         Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)]
        var top_left = [Math.floor((object.hitbox.position.y) / 16),
                         Math.floor(object.hitbox.position.x / 16)]
        var top_right = [Math.floor((object.hitbox.position.y) / 16),
                          Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)]
                          
        // left side collision
        if (this.map[top_left[0]][top_left[1]] === 202 || 
            this.map[bot_left[0]][bot_left[1]] === 202) {
                if( object.velocity.x < 0) {
                    const offset = object.hitbox.position.x - object.position.x
                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = (top_left[1] + 1) * 16 - offset + 0.01
                    object.bounce = true
                    console.log(top_left)
                    console.log(top_right)
                }
        }

        // right side collision
        if (this.map[top_right[0]][top_right[1]] === 202 || 
            this.map[bot_right[0]][bot_right[1]] === 202) {
                if( object.velocity.x > 0) {
                    const offset = object.hitbox.position.x - object.position.x + object.hitbox.width

                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = top_right[1] * 16 - offset - 0.01
                    object.bounce = true
                    console.log(top_right)
                    console.log(bot_right)
                }
        }
    }

    vertical_collisions(object) {
        var bot_left = [Math.floor((object.hitbox.position.y + object.hitbox.height) / 16),
                        Math.floor(object.hitbox.position.x / 16)]
        var bot_right = [Math.floor((object.hitbox.position.y + object.hitbox.height) / 16),
                         Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)]
        var top_left = [Math.floor((object.hitbox.position.y) / 16),
                        Math.floor(object.hitbox.position.x / 16)]
        var top_right = [Math.floor((object.hitbox.position.y) / 16),
                         Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)]

        // top side collision
        if (this.map[top_left[0]][top_left[1]] === 202 || 
            this.map[top_right[0]][top_right[1]] === 202) {
                if( object.velocity.y < 0) {
                    object.velocity.y = -1/4 * object.velocity.y
                    const offset = object.hitbox.position.y - object.position.y
                    object.position.y = (top_left[0] + 1) * 16 - offset + 0.01
                    this.bounce = true
                }
        }

        // bottom side collision
        if (this.map[bot_left[0]][bot_left[1]] === 202 || 
            this.map[bot_right[0]][bot_right[1]] === 202) {
            const offset = object.hitbox.position.y - object.position.y + object.hitbox.height
            object.position.y = bot_left[0] * 16 - offset - 0.01
            // if (object.velocity.y > 4) {
            //     object.velocity.y = -1/5 * object.velocity.y
            //     object.bounce = true
            // } else {
                object.velocity.y = 0
                object.velocity.x = 0
                object.bounce = false
            //}
            
        }
    }
}