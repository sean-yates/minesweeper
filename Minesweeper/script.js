// GLOBAL CONSTANTS

const board = document.getElementById("board");



// GLOBAL VARIABLES
let puzzleStarted = false;
let width = 9;
let height = 9;
let mines = 10;
let revealedCount = 0;
let flagged = 0;
let squares = []
let gameState = 0 // 0 for unresolved, -1 for lost, 1 for won

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
    cell.id = (c);
    cell.addEventListener("click",leftClickSquare)
    cell.addEventListener("contextmenu",rightClickSquare)
    board.appendChild(cell).className = "grid-item";
  };
  board.style.width = `${30 * cols}px`
};

function leftClickSquare(e) { // had to split this out because I couldn't get the event listener to pass in the target, and I wanted to do recursion which means the function needs to work off id
    e.preventDefault()
   handleLeftClick(e.target.id)
}

function handleLeftClick(id){
    square = squares[id]
    if (square.flagged){return}// don't do anything if the square is already flagged
    if (!puzzleStarted){ // if this is the first time we click
        mineAssigner(id) // set up the mines
        adjacenyFinder() // and determine the adjacent mines count of each square
        puzzleStarted = true // make sure we don't do it again
    }
    if (square.revealed) { // handles clicking on squares that are already revealed
        let adjacentFlagged = 0;
        square.adjacentSquares.forEach((adjSquare) =>{
                if (squares[adjSquare].flagged) {adjacentFlagged++} // build a count of adjacent flagged squares
        })
        if (square.adjacentMines - adjacentFlagged === 0) { // if enough squares are flagged, try clicking all unrevealed squares
            square.adjacentSquares.forEach((adjSquare) =>{
                if (!(squares[adjSquare].revealed) && (!(squares[adjSquare].flagged))) {handleLeftClick(adjSquare)} // flagged squres already already ignored, so just need to skip revealed squares here
            })
        }
    }
    if (squareRevealer(id)){return} // reveals the square and returns if it is a mine to stop the function

    if (square.adjacentMines === 0){ // if there are no adjacent mines it is safe to automatically click all adjacent unrevealed squares
        square.adjacentSquares.forEach((adjSquare) =>{
            if (!(squares[adjSquare].revealed)) {handleLeftClick(adjSquare)}
        })
    }
    if (revealedCount + mines === height * width && gameState === 0){
        console.log("you win!") // TODO: build out win scenario
        gameState = 1
    }
}

function squareRevealer(id){ // reveals a square with the corresponding ID, returns true if it is a mine or false otherwise
    if (!squares[id].revealed){revealedCount++}
    squares[id].revealed = true;
    $square = $(`#${square.id}`)
    $square.addClass(`revealed`)
    if (square.adjacentMines !== -1){ // only do this if it's not a mine
           $square.addClass(`adj${square.adjacentMines}`)
           if (!(square.adjacentMines == 0)) {$square.text(`${square.adjacentMines}`)} // don't need to show 0
           return false
        } else {
            $square.text(`💣`)
            if (gameState === 0) {
                console.log("you lose!") //TODO: built out lose scenario
                gameState = -1
            }
            return true
        }
}

function mineAssigner(startId) { // fills the board up with mines
    currentMines = 0;
    while (currentMines < mines) {
        potentialMine = squares[Math.floor(Math.random() * (squares.length))]
        if ((!(potentialMine.id == startId)) && (!(squares[startId].adjacentSquares.includes(potentialMine.id))) && (potentialMine.adjacentMines !== -1)){ // doesn't do anything if the mine would be near the opening click, or adjacent to where you clicked, or is already a mine
            potentialMine.adjacentMines = -1
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

function rightClickSquare(e) {
    e.preventDefault()
    square = squares[e.target.id]
    if (square.flagged) {
        square.flagged = false
        $(`#${square.id}`).text(``)
    } else 
    if (!square.revealed){
        square.flagged = true
        $(`#${square.id}`).text(`🚩`)
    }
}


function cheat(){ // test tool, call this to show everything
    squares.forEach((square) => {
        if (square.adjacentMines !== -1){ // only do this if it's not a mine
           $(`#${square.id}`).text(`${square.adjacentMines}`)
        } else {
            $(`#${square.id}`).text(`M`)
        }
        
    })
}
boardGenerator()

