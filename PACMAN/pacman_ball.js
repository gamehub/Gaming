import { OBJECT_TYPE, DIRECTIONS } from "./setup.js";

class Pacman {
    constructor(speed, startPos) {
        this.pos = startPos;
        this.speed = speed;
        this.dir = null; //represent the keys such as ArrowUp,ArrowDown ..etc
        this.timer = 0;
        this.powerPill = false;
        this.rotation = true;
    }

    //if pacman is to move or not
    shouldMove() {
        if (!this.dir) return false; // when no arrow has been pressed

        if (this.timer === this.speed) {
            this.timer = 0;
            return true;
        }
        this.timer++; //every speed times, the pacman moves
    }

    getNextMove(objectExist) {
        let nextMovePos = this.pos + this.dir.movement;

        //when moving(without user change of keys), it encounters a wall or ghostlair
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) {
            nextMovePos = this.pos; //if it encounters a wall or lair then it remains in same position
        }


        return { nextMovePos, direction: this.dir }; //returning an object
        //dont have to mention : in the object unless u want to change name. as per ES6 syntax
    }

    makeMove() {
        //removing classes on current pacman and adding to new pacman
        const classesToRemove = [OBJECT_TYPE.PACMAN];
        const classesToAdd = [OBJECT_TYPE.PACMAN];

        return { classesToRemove, classesToAdd };
    }

    setNewPos(nextMovePos, direction) {
        this.pos = nextMovePos;
        this.dir = direction;
    }

    //e is pressed button in index_js, objectExist from Gameboard class
    //The method of passing in functions as parameters to other functions to use them inside 
    //as in the case objectExist
    handleKeyInput(e, objectExist) {
        // console.log(e)
        let dir;

        if (e.keyCode >= 37 && e.keyCode <= 40) { //keycode(37,38 etc) and key(ArrowUp etc) are inbuilt funvtions 
            dir = DIRECTIONS[e.key];
        } else {
            return;
        }

        //if we press key which points towards ghostlair or wall when moving but pacman can still go forward,
        // then we should return null at this point only so it continues moving forwrd

        const nextMovePos = this.pos + dir.movement;
        if (objectExist(nextMovePos, OBJECT_TYPE.WALL) || objectExist(nextMovePos, OBJECT_TYPE.GHOSTLAIR)) return;

        this.dir = dir; //updating new direction
    }
}

export default Pacman;