import { LEVEL, OBJECT_TYPE } from "./setup.js";
import { randomMovement, logicalMovement } from "./ghostMoves.js";
//classes
import GameBoard from "./GameBoard.js"; //dont have to use {GameBoard} since we used export default
import Pacman from "./pacman_ball.js";
import Ghost from "./Ghost.js";

// DOM elements - DOCUMENT OBJECT MODEL 
// its basically the tags such as html, head, body p, h1, etc
//with this object model js can make changes to create new stuff by the inbuilt actions and all

const gameGrid = document.querySelector('#game')
const scoreTable = document.querySelector('#score')
const startButton = document.querySelector('#start-button')

//game constants - wont change

const POWER_PILL_TIME = 10000; //MILLISEC
const GLOBAL_SPEED = 80; //MILLISEC
let gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);



//INITIAL SET UP
let score = 0;
let timer = null;
let gameWin = false;
let powerPillActive = false; //when pacman eats a power pill
let powerPillTimer = null;


function gameOver(pacman, grid) {
    document.removeEventListener('keydown', e =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    gameBoard.showGameStatus(gameWin);

    clearInterval(timer); //clears the timer associated with setInterval

    startButton.classList.remove('hide')

}

function checkCollision(pacman, ghosts) {
    //The find() method returns the value of the first element in an array that pass a test (provided as a function)
    //returns corresponding gost if exists or else undefined
    const collidedGhost = ghosts.find(ghost => pacman.pos === ghost.pos)

    if (collidedGhost) {
        //pacman can eat ghost if it ate powerpill
        if (pacman.powerPill) {
            gameBoard.removeObject(collidedGhost.pos, [OBJECT_TYPE.GHOST, OBJECT_TYPE.SCARED, collidedGhost.name])

            //reset that ghost position when dies
            collidedGhost.pos = collidedGhost.startPos
            score += 10 //score if he eats ghost

        } else { //when pacman dies
            gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN])
            gameBoard.rotateDiv(pacman.pos, 0) //same logic: if ghost comes here then rotation will happen, if not set to 0

            gameOver(pacman, gameGrid)
        }
    }

}

//to move pacman
function gameLoop(pacman, ghosts) {
    gameBoard.moveCharacter(pacman)
    checkCollision(pacman, ghosts)

    //we have to check collsion every time any character moves

    ghosts.forEach(ghost => gameBoard.moveCharacter(ghost, pacman.pos));
    checkCollision(pacman, ghosts)

    //if pacman eats dot
    if (gameBoard.objectExist(pacman.pos, [OBJECT_TYPE.DOT])) {

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT])
        score += 1
        gameBoard.dotCount--

    }

    //if pacman eats powerpill
    if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {

        gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL])

        pacman.powerPill = true
        score += 2

        clearTimeout(powerPillTimer)
        powerPillTimer = setTimeout(() => (pacman.powerPill = false), POWER_PILL_TIME)
            // () => is another way of defining function, instead of function(){}

    }

    //this will enter loop only if its different so one iteration is enough
    if (pacman.powerPill !== powerPillActive) {
        powerPillActive = pacman.powerPill; //updating powerpillactive bcoz we already updated pacman.powerpill
        ghosts.forEach(ghost => ghost.isScared = pacman.powerPill) //make ghost scared or not scared according powerpill status
    }

    //if all dots eaten
    if (gameBoard.dotCount === 0) {
        gameWin = true;
        gameOver(pacman, gameGrid);
    }

    //SHOWSCORE
    scoreTable.innerHTML = score;
}

function startGame() {
    gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);
    gameWin = false;
    powerPillActive = false;
    score = 0;


    startButton.classList.add('hide');

    // gameBoard.createGrid(LEVEL);

    const pacman = new Pacman(2, 287)
    gameBoard.addObject(287, [OBJECT_TYPE.PACMAN])

    // arrow function: The left part denotes the input of a function
    // the right part the output of that function.

    //keydown is when user is pressing a key

    //bind() allows us to explicitly define what value this will have inside a function by binding an object to that function.
    document.addEventListener('keydown', (e) =>
        pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    );

    // const ghosts = [new Ghost(5, 188, logicalMovement, OBJECT_TYPE.BLINKY)];

    const ghosts = [
        new Ghost(5, 188, logicalMovement, OBJECT_TYPE.BLINKY),
        new Ghost(4, 209, randomMovement, OBJECT_TYPE.PINKY),
        new Ghost(3, 230, logicalMovement, OBJECT_TYPE.INKY),
        new Ghost(2, 251, randomMovement, OBJECT_TYPE.CLYDE)
    ];
   

    //in setinterval only functionname must be writen i.e. setInterval(gameLoop,time,param1,....)
    //but here gameLoop function has parameters.  so we have to write like () => gameLoop() inorder to inclyde parmaeters
    timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
    // timer = setInterval(gameLoop(pacman, ghosts), GLOBAL_SPEED);

}

//initialize game
startButton.addEventListener('click', startGame)


/////////////////////////////


// const pacman = new Pacman(2, 287)
// gameBoard.addObject(287, [OBJECT_TYPE.PACMAN])





// console.log(getPositionXY(pacman.pos)) //starts from 0
