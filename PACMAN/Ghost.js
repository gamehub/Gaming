import { DIRECTIONS, OBJECT_TYPE } from "./setup.js";

class Ghost {
    //default value of speed is 5 if not mentioned when called

    //the randomMovement from ghostmoves is going to be sent at movement parameter
    constructor(speed = 5, startPos, movement, name) {
        this.name = name;
        this.movement = movement;
        this.startPos = startPos;
        this.pos = startPos;
        this.dir = DIRECTIONS.ArrowRight;
        this.speed = speed;
        this.timer = 0;
        this.isScared = false; //when pacman has eaten powerpill, ghost becomes scared
        this.rotation = false; //ghost shouldn't rotate
    }

    shouldMove() {
        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++;
    }

    getNextMove(objectExist, getPositionXY, pacmanpos) {
        const { nextMovePos, direction } = this.movement(this.pos, this.dir, objectExist, getPositionXY, pacmanpos)

        return { nextMovePos, direction }
    }

    makeMove() {

        const classesToRemove = [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, this.name]

        //it is 'let' bcoz we ha e to check if ghost is scared, and if it is we have to asdd those classes also
        let classesToAdd = [OBJECT_TYPE.GHOST, this.name]

        if (this.isScared) classesToAdd = [...classesToAdd, OBJECT_TYPE.SCARED]

        return { classesToRemove, classesToAdd }
    }

    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction; //LEARN WHAT DIFFERENCE THIS LINE MAKES
    }

    // setNewPos(nextMovePos,direction) {
    //     this.pos = nextMovePos;
    //     this.dir = direction;
    // }
}

export default Ghost;