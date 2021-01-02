// GLOBAL VARIABLES
let puzzleStarted = false;
let width = 9;
let height = 9;
let mines = 10;
let revealed = 0;
let flagged = 0;
let squares = []


// functions

function boardGenerator(){ // generates an array of objects with each object represending a square on the grid
    //TODO to clear HTML here
    let totalSquares = width * height;
    for (let i = 0; i < totalSquares; i++) { // run a number of times equal to the number of squares there will be
        let newSquare = {}
        newSquare.id = i;
        newSquare.revealed = false;
        newSquare.adjacentMines = -2;
        newSquare.flagged = false;
        newSquare.adjacentSquares = []; // starts empty, we will fill this based on square type
        let north = i - width // work out the id of each possible adjacent square
        let northEast = i - width + 1
        let east = i + 1
        let southEast = i + width + 1
        let south = i + width
        let southWest = i + width - 1
        let west = i - 1
        let northWest = i - width - 1
        if (i === 0) { // top left corner    
            newSquare.adjacentSquares.push(east, southEast, south)
        } else 
        if (i === width - 1) { // top right corner
            newSquare.adjacentSquares.push(south, southWest, west)
        } else
        if (i=== (totalSquares - width)) { //bottom left corner
            newSquare.adjacentSquares.push(north, northEast, east)
        } else
        if (i === totalSquares - 1) { //bottom right corner
            newSquare.adjacentSquares.push(west, northWest, north)
        } else
        if (i > 0 && i < width - 1) { // top edge
            newSquare.adjacentSquares.push(east, southEast, south, southWest, west)
        } else
        if (i > (totalSquares - width - 1) && i < totalSquares - 1) { // bottom edge
            newSquare.adjacentSquares.push(west, northWest, north, northEast, east)
        } else 
        if (i % width === 0) { // left edge
            newSquare.adjacentSquares.push(north,northEast,east,southEast,south)
        } else 
        if (i % width === width - 1) { // right edge 
            newSquare.adjacentSquares.push(south,southWest,west,northWest,north)
        } else { // if none of the above it is not a border square
            newSquare.adjacentSquares.push(north, northEast, east, southEast, south, southWest, west, northWest)
        }
        squares.push(newSquare)
    }
    console.log(squares)
}





boardGenerator()
