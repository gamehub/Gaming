import { GRID_SIZE, CELL_SIZE, OBJECT_TYPE, CLASS_LIST } from "./setup.js";

// A JavaScript class is not an object.
// It is a template for JavaScript objects.
// you can use the class to create objects

class GameBoard {
    constructor(DOMGrid) {
        this.dotCount = 0;
        this.grid = [];
        this.DOMGrid = DOMGrid; //the one we sent as parameter
    }

    //method in class is basically function

    //to tell if we won the game or not 
    showGameStatus(gameWin) {
        const div = document.createElement('div'); //creates a new <div> element........basically creates a node
        div.classList.add('game-status');
        div.innerHTML = `${gameWin ? 'WIN!!' : 'LOST!!'}`; //`${}` : whatever comes within {} is the variable, whatever is outside {} is just normal text that's printed
        this.DOMGrid.appendChild(div); //appending to entire doc (as far as i understood DOMGrid is like entire doc)
    }

    //method to create grid

    createGrid(level) {
        this.dotCount = 0; //set back to 0 every time new game starts
        this.grid = [];
        this.DOMGrid.innerHTML = ''; //wipe all div out
        this.DOMGrid.style.cssText = `grid-template-columns: repeat(${GRID_SIZE}, ${CELL_SIZE}px);`; // it repeats cell size , 20times(grid size)

        level.forEach((square) => {
            const div = document.createElement('div');
            div.classList.add('square', CLASS_LIST[square]);
            div.style.cssText = `width: ${CELL_SIZE}px; height: ${CELL_SIZE}px;`;
            this.DOMGrid.appendChild(div);
            this.grid.push(div);

            // to get total dotcount
            if (CLASS_LIST[square] === OBJECT_TYPE.DOT) this.dotCount++;

            if (CLASS_LIST[square] === OBJECT_TYPE.PACMAN) {
                var rect = div.getBoundingClientRect()
                console.log(rect.x, rect.y)
            }
        });
    }

    //to add classes to each div in the grid array
    addObject(pos, classes) {
        this.grid[pos].classList.add(...classes); //... means it spreads everything in it
    }

    removeObject(pos, classes) {
        this.grid[pos].classList.remove(...classes);
        //remove and add can do multiple clsses at a time
    }

    // or do ` objectExist = (pos, object) => {`  instead of binding each time
    objectExist(pos, object) {
        return this.grid[pos].classList.contains(object); //return bolean to check if it exists or not
        //contains can check only one class at a time
    }

    //to rotate pacman on grid
    rotateDiv(pos, deg) {
        this.grid[pos].style.transform = `rotate(${deg}deg)`;
    }

    //for both pacman and ghost
    moveCharacter(character, pacmanpos) {
        if (character.shouldMove()) {
            // const { nextMovePos, direction } = character.getNextMove(
            //         this.objectExist.bind(this))

            //TRY WITHOUT BINDING
            // bind implies which 'this' to take

            //let { nextMovePos, direction } = {0, }

            var { nextMovePos, direction } = character.getNextMove(
                this.objectExist.bind(this), this.getPositionXY.bind(this), pacmanpos)
            
            const { classesToRemove, classesToAdd } = character.makeMove();

            // .rotation is set to true only for pacman and false for ghost class
            if (character.rotation && nextMovePos !== character.pos) {
                // Rotate
                this.rotateDiv(nextMovePos, character.dir.rotation); //grabbing rotation from DIRECTIONS object in setup.js
                // Rotate the previous div back to 0,
                // to prevent ghost from being rotated if it reaches the point where pacman has been rotated previously
                //bcoz rotatediv set the previous rotation of pacman to some degree when we pressed arrow key
                this.rotateDiv(character.pos, 0);
            }

            //basically getting classes for a pos from grid array and adding to gameBoard (main thing)
            this.removeObject(character.pos, classesToRemove) // to remove classes from current position
            this.addObject(nextMovePos, classesToAdd)

            // character.setNewPos(nextMovePos, direction)
            character.setNewPos(nextMovePos, direction)
        }
    }

    //static method directly allows u to call from class only name itself instead of calling from object created through class
    // we can directly call this method in index filen instead of creating object and calling createGrid again
    static createGameBoard(DOMGrid, level) {
        const board = new this(DOMGrid); //creating object
        board.createGrid(level);
        return board;
    }


    getPositionXY(index) {
        return [index % GRID_SIZE, Math.floor(index / GRID_SIZE)]
    }

}

export default GameBoard
//default only used for one item export and can be used only once ig
// default is genrally used when we havent mentioned the function/var/class ..etc name
//direct we can do 
// export default function() 
//without giving function name
// or we can do it as done above
