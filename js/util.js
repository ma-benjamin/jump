function collision ({
    object1, object2
}) {
    return (object1.position.y + object1.height >= object2.position.y &&
        object1.position.y <= object2.position.y + object2.height &&
        object1.position.x <= object2.position.x + object2.width &&
        object1.position.x + object1.width >= object2.position.x)
}

function slope_collision ({
    object1, object2
}) {
    switch(object2.corner) {
        case 'topL':
            return (object1.position.y <= object2.slope_height(object1) &&
                    object1.position.y >= object2.position.y &&
                    // object1.position.x <= object2.position.x + object1.width &&
                    object1.position.x >= object2.position.x)
        case 'topR':
            return (object1.position.y <= object2.slope_height(object1) &&
                    object1.position.y >= object2.position.y &&
                    object1.position.x + object1.width <= object2.position.x + object2.width )
        case 'botL':
            return (object1.position.y + object1.height >= object2.slope_height(object1) &&
                    object1.position.y + object1.height <= object2.position.y + object2.height &&
                    object1.position.x >= object2.position.x)
        case 'botR':
            return (object1.position.y + object1.height >= object2.slope_height(object1) &&
                    object1.position.y + object1.height <= object2.position.y + object2.height &&
                    object1.position.x + object1.width <= object2.position.x + object2.width)
    }
    return false
}