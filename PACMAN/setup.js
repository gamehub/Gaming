//export enables us to take to another file
export const GRID_SIZE = 20; //NO. OF COLUMNS
export const CELL_SIZE = 20; //SIZE OF CELLS
export const DIRECTIONS = { //USER CONTROLS DIRECTIONS
    ArrowLeft: { // js objects
        code: 37,
        movement: -1,
        rotation: 180 //since pacman starts off to the right
    },
    ArrowUp: { // js objects
        code: 38,
        movement: -GRID_SIZE,
        rotation: 270
    },
    ArrowRight: { // js objects
        code: 39,
        movement: 1,
        rotation: 0
    },
    ArrowDown: { // js objects
        code: 40,
        movement: GRID_SIZE,
        rotation: 90
    }
};

//set diferent classes on div in game
export const OBJECT_TYPE = {
    BLANK: 'blank',
    WALL: 'wall',
    DOT: 'dot',
    BLINKY: 'blinky', //thE 4 ghosts
    PINKY: 'pinky',
    INKY: 'inky',
    CLYDE: 'clyde',
    PILL: 'pill',
    PACMAN: 'pacman',
    GHOST: 'ghost',
    SCARED: 'scared', //if ghost is scared
    GHOSTLAIR: 'lair'
};

//look up array for classes, only used when we draw the grid
//incase we want to change class name then instead of changing everywhere we can jsut change it in OBJECT_TYPE
export const CLASS_LIST = [
    OBJECT_TYPE.BLANK,
    OBJECT_TYPE.WALL,
    OBJECT_TYPE.DOT,
    OBJECT_TYPE.BLINKY,
    OBJECT_TYPE.PINKY,
    OBJECT_TYPE.INKY,
    OBJECT_TYPE.CLYDE,
    OBJECT_TYPE.PILL,
    OBJECT_TYPE.PACMAN,
    OBJECT_TYPE.GHOSTLAIR,
];

//THIS DRAWS THE GRID based class_list
// 1- wall, 2- dot .....and so on

export const LEVEL = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
    0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 0, 0, 0,
    1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
    1, 0, 0, 0, 2, 2, 2, 1, 9, 9, 9, 9, 1, 2, 2, 2, 0, 0, 0, 1,
    1, 1, 1, 1, 2, 1, 2, 1, 9, 9, 9, 9, 1, 2, 1, 2, 1, 1, 1, 1,
    0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0,
    0, 0, 0, 1, 2, 1, 2, 0, 0, 0, 0, 0, 0, 2, 1, 2, 1, 0, 0, 0,
    1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1,
    1, 2, 2, 2, 2, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 2, 2, 2, 1,
    1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 7, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 7, 1,
    1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 1,
    1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];