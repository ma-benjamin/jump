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

//     collusion(object) {
//         if( object.position.y )
//     }
}