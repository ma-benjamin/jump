maps = {
    level1: {
        image: new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/level1.png'
        }),
        map: new Map({
            map: level1_map
        }),
        start_position: {
            x: 110,
            y: 650
        }
    },
    level2: {
        image: new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/level2.png'
        }),
        map: new Map({
            map: level2_map,
            finish: {
                l: 0,
                r: 0,
                t: 0,
                b: 0
            }
        }),
        start_position: {
            x: 165,
            y: 830
        }
    },
    level3: {
        image: new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: './img/level3.png'
        }),
        map: new Map({
            map: level3_map,
            width: 32,
            finish: {
                l: 0,
                r: 0,
                t: 0,
                b: 0
            },
        }),
        start_position: {
            x: 288,
            y: 1150
        }
    }
}
