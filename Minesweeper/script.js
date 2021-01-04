// GLOBAL CONSTANTS

const board = document.getElementById("board");



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
    board.innerHTML = ''; // remove the existing grid
    let totalSquares = width * height;
    for (let i = 0; i < totalSquares; i++) { // run a number of times equal to the number of squares there will be
        let newSquare = {}
        newSquare.id = i;
        newSquare.revealed = false;
        newSquare.adjacentMines = 0;
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
    makeRows(width, height); // generate a fresh grid with ids matching the squares array
}

function makeRows(rows, cols) { //adds a grid to the HTML with IDs matching the object IDs from squares
  board.style.setProperty('--grid-rows', rows);
  board.style.setProperty('--grid-cols', cols);
  for (c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    cell.innerText = (c);
    cell.id = (c);
    cell.addEventListener("click",leftClickSquare)
    board.appendChild(cell).className = "grid-item";
  };
  board.style.width = `${30 * cols}px`
};

function leftClickSquare(e) { // had to split this out because I couldn't get the event listener to pass in the target, and I wanted to do recursion which means the function needs to work off id
   handleLeftClick(e.target.id)
}

function handleLeftClick(id){
    square = squares[id]
    console.log(square)
    if (square.flagged){ // don't do anything if the square is already flagged
        return
    }
    if (!puzzleStarted){ // if this is the first time we click
        mineAssigner(id) // set up the mines
        adjacenyFinder() // and determine the adjacent mines count of each square
        visualizer() // TODO: remove this when we start working on hiding / revealing
        puzzleStarted = true // make sure we don't do it again
    }
    if (square.revealed) {
        return // TODO: multiple reveals by clicking a revealed square
        // for(let i=0; i < square.adjacentSquares.length; i++){ // if the square is already revealed, click !!!UNREVELEAED!!! squares around it assuming there are enough flags to cover potential mines
        // }
    }
    if (squareRevealer(id)){ // reveals the square and returns true if it is a mine
        return
    }
    // if (square.adjacentMines === 0){ // if there are no adjacent mines it is safe to automatically click all adjacent squares
    //     square.adjacentSquares.forEach((adjSquare) =>{ // TODO: doesn' work currently, 0s keeps getting undefined results sometimes
    //         handleLeftClick(adjSquare.id)
    //     })
    // }
    if (revealed + mines === height * width){
        console.log("you win!") // TODO: make this an actual win result
    }
    console.log(square.adjacentSquares)
}

function squareRevealer(id){ // reveals a square with the corresponding ID, returns true if it is a mine or false otherwise
    //TODO: actually make it do that
    console.log("PREST-O CHANGE-O")
    squares[id].revealed = true;
}

function mineAssigner(startId) { // fills the board up with mines
    currentMines = 0;
    while (currentMines < mines) {
        potentialMine = squares[Math.floor(Math.random() * (squares.length))]
        if ((!(potentialMine.id == startId)) && (!(squares[startId].adjacentSquares.includes(potentialMine.id))) && (potentialMine.adjacentMines !== -1)){ // doesn't do anything if the mine would be near the opening click, or adjacent to where you clicked, or is already a mine
            potentialMine.adjacentMines = -1
            console.log(`${potentialMine.id} is now a mine!`) // TODO: can remove this when we're done
            currentMines++
        }
    }
}

function adjacenyFinder() { // runs through all squares and sets the value of adjacent mines
    squares.forEach((square) => {
        if (square.adjacentMines !== -1){ // only do this if it's not a mine
           square.adjacentSquares.forEach((adjSquare) => {
                if(squares[adjSquare].adjacentMines === -1) {square.adjacentMines++} // loop through the adjacent squares of each and built a count of mines
            })
        }
    })
}


function visualizer(){ // test tool, let results show up in the UI
    squares.forEach((square) => {
        if (square.adjacentMines !== -1){ // only do this if it's not a mine
           $(`#${square.id}`).text(`${square.adjacentMines}`)
        } else {
            $(`#${square.id}`).text(`M`)
        }
        
    })
}
boardGenerator()

