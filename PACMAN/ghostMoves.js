import { DIRECTIONS, OBJECT_TYPE } from './setup.js';



//random movement

export function randomMovement(position, direction, objectExist) {
    let dir = direction;
    let nextMovePos = position + dir.movement;

    //when ghost encounters a wall/another ghost
    while (
        objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
        objectExist(nextMovePos, OBJECT_TYPE.GHOST)
    ) {

        //create array from direction object keys
        const keys = Object.keys(DIRECTIONS);

        //random*(n)....returns a random number from 0 to n-1
        const key = keys[Math.floor(Math.random() * keys.length)]
            //key just holds the object element name and not the object itself

        //set next direction and movement
        dir = DIRECTIONS[key] //returns object for it to be accessed later on 
        nextMovePos = position + dir.movement
    }

    return { nextMovePos, direction: dir }
}

export function logicalMovement(position, direction, objectExist, getPositionXY, pacmanpos) {
    let dir = null;
    let nextMovePos = 0;

    if (objectExist(position, OBJECT_TYPE.GHOSTLAIR)) {
        return randomMovement(position, direction, objectExist)
    }



    //create array from direction object keys
    const keys = Object.keys(DIRECTIONS);

    const [ghostX, ghostY] = getPositionXY(position)
    const [pacX, pacY] = getPositionXY(pacmanpos)
    let [ghostNewX, ghostNewY] = getPositionXY(nextMovePos)


    function isXCloser() {
        if (Math.abs((ghostNewX - pacX)) < Math.abs((ghostX - pacX))) return true

        else return false
    }

    function isYCloser() {
        if (Math.abs((ghostNewY - pacY)) < Math.abs((ghostY - pacY))) return true
        else return false
    }


    for (let i = 0; i < keys.length; i++) {
        dir = DIRECTIONS[keys[i]];
        nextMovePos = position + dir.movement;
        [ghostNewX, ghostNewY] = getPositionXY(nextMovePos);

        let c1 = isXCloser() || isYCloser()
        let c2 = objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOST)

//         console.log(getPositionXY(position), c1, c2, i)

        if (c1 && !c2) {
            return { nextMovePos, direction: dir }
        }
    }

    return randomMovement(position, direction, objectExist)
}
