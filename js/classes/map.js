class Map {
    constructor({map, width = 16, finish}) {
        this.map = []
        this.blocks = []
        this.slopes = []
        for (let i = 0; i < map.length; i += width) {
            this.map.push(map.slice(i, i + width))
        }
        this.finish_bounds = finish
        this.map.forEach((row, y) => {
            row.forEach((symbol, x) => {
                switch (symbol) {
                    case 200:
                        this.blocks.push( 
                            new Block ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                }
                            })
                        )
                        break
                    case 201:
                        this.blocks.push( 
                            new Platform ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                }
                            })
                        )
                        break
                    case 202:
                        this.slopes.push( 
                            new Slope ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                },
                                corner: 'topL'
                            })
                        )
                        break
                    case 203:
                        this.slopes.push( 
                            new Slope ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                },
                                corner: 'topR'
                            })
                        )
                        break
                    case 204:
                        this.slopes.push( 
                            new Slope ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                },
                                corner: 'botL'
                            })
                        )
                        break
                    case 205:
                        this.slopes.push( 
                            new Slope ({
                                position: {
                                    x: 16 * x,
                                    y: 16 * y,
                                },
                                corner: 'botR'
                            })
                        )
                        break
                }
            })
        })
    }

    draw() {
        this.blocks.forEach((block) => {
            block.draw()
        })
        this.slopes.forEach((slope) => {
            slope.draw()
        })
    }

    update() {
        this.draw()
    }

    horizontal_collisions(object) {
        const topside = Math.floor((object.hitbox.position.y) / 16)
        const leftside = Math.floor(object.hitbox.position.x / 16)
        const rightside = Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)
        const botside = Math.floor((object.hitbox.position.y + object.hitbox.height) / 16)

        // left side collision
        if (this.map[topside][leftside] === 200 || 
            this.map[botside][leftside] === 200) {
                if( object.velocity.x < 0) {
                    const offset = object.hitbox.position.x - object.position.x
                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = (leftside + 1) * 16 - offset + 0.01
                    object.bounce = true
                }
        }

        // right side collision
        if (this.map[topside][rightside] === 200 || 
            this.map[botside][rightside] === 200) {
                if( object.velocity.x > 0) {
                    const offset = object.hitbox.position.x - object.position.x + object.hitbox.width

                    object.velocity.x = -1/2 * object.velocity.x
                    object.position.x = rightside * 16 - offset - 0.01
                    object.bounce = true
                }
        }
    }

    vertical_collisions(object) {
        const topside = Math.floor((object.hitbox.position.y) / 16)
        const leftside = Math.floor(object.hitbox.position.x / 16)
        const rightside = Math.floor((object.hitbox.position.x + object.hitbox.width) / 16)
        const botside = Math.floor((object.hitbox.position.y + object.hitbox.height) / 16)
        
        // top side
        if (this.map[topside][leftside] === 200 || 
            this.map[topside][rightside] === 200) {
                if( object.velocity.y < 0) {
                    object.velocity.y = -1/4 * object.velocity.y
                    const offset = object.hitbox.position.y - object.position.y
                    object.position.y = (topside + 1) * 16 - offset + 0.01
                    this.bounce = true
                }
        }

        // bottom side
        if (this.map[botside][leftside] === 200 || 
            this.map[botside][rightside] === 200) {
            const offset = object.hitbox.position.y - object.position.y + object.hitbox.height
            object.position.y = botside * 16 - offset - 0.01
            if (object.velocity.y > 5) {
                object.velocity.y = -1/5 * object.velocity.y
                object.bounce = true
            } else if (object.velocity.y > 0) {
                object.velocity.y = 0
                object.velocity.x = 0
                object.bounce = false
            } 
        }

        // bottom side platforms
        if (this.map[botside][leftside] === 201 || 
            this.map[botside][rightside] === 201) {
            const offset = object.hitbox.position.y - object.position.y + object.hitbox.height
            if (object.hitbox.position.y + object.hitbox.height > botside * 16 + 8) {
                    return
                }
            if (object.velocity.y > 4) {
                object.position.y = botside * 16 - offset - 0.01
                object.velocity.y = -1/5 * object.velocity.y
                object.bounce = true
            } else if (object.velocity.y > 0) {
                object.position.y = botside * 16 - offset - 0.01
                object.velocity.y = 0
                object.velocity.x = 0
                object.bounce = false
            } 
        }
    }

    slope_vertical_collusion(object) {
        for (let i = 0; i < this.slopes.length; i++) {
            const slope = this.slopes[i]

            if (slope_collision({object1: object.hitbox, object2: slope})) {
                // console.log(object.velocity.y)
                // console.log(slope.corner)
                // console.log(object.position)
                // console.log(slope.position)
                // console.log(slope.slope_height(object))
                if (object.velocity.y < 0) {
                    object.bounce = true
                    if ( slope.corner === 'topR' ) {
                        object.velocity.x = object.velocity.y
                        const offset = object.hitbox.position.y - object.position.y
                        object.position.y = slope.slope_height(object.hitbox) - offset + 0.01
                    } else if ( slope.corner === 'topL' ) {
                        object.velocity.x = -object.velocity.y
                        const offset = object.hitbox.position.y - object.position.y
                        object.position.y = slope.slope_height(object.hitbox) - offset + 0.01
                    }
                    object.velocity.y = 0
                } else if (object.velocity.y > 0) {
                    object.bounce = true
                    if ( slope.corner === 'botL' ) {
                        object.velocity.x = 0.8 * object.velocity.y
                        const offset = object.hitbox.position.y - object.position.y + object.hitbox.height
                        object.position.y = slope.slope_height(object.hitbox) - offset - 0.01
                    } else if ( slope.corner === 'botR' ) {
                        object.velocity.x = -0.8 * object.velocity.y
                        const offset = object.hitbox.position.y - object.position.y + object.hitbox.height
                        object.position.y = slope.slope_height(object.hitbox) - offset - 0.01
                    }
                    object.velocity.y = 0
                }
            }
        }
    }

    finished(object) {
        
    }


}