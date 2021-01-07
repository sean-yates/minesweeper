# ApplicationName
Minesweeper

## Concept: 

Game should start with a blank 9 x 9 grid with no squares revealed and 10 randomly hidden mines

left clicking any square should reveal it, revealing a mine should end the game

the first square revealed should never be a mine or adjacent to a mine

Squares that don’t have a mine but are adjacent to any number of mines should show the number of mines they are adjacent to when revealed

right clicking a square should put a flag on it, indicating the user believes it has a mine

game should show how many mines remain unflagged

game should should show how much time has passed since starting the puzzle, pausing when a mine is clicked or the game is won

correctly revealing all non mines wins the game

clicking new game should take the grid back to the starting point and reset the timer


## Wireframes:

https://i.imgur.com/NLdHxjl.png

## Technologies Used:
    - HTML
    - CSS 
    - MockFlow
    - JavaScript
    - Jquery

## Approach: 

Set up a grid in the HTML of square divs with sequential IDs.

Build an array of objects the same length as the number of square divs, with each object representing a square on the board.

The object will store important information about the square, such as if it's a mine, which squares are adjacent, how many mines are adjacent, whether it's flagged, whether it's been revealed.

Replace the text of the square divs with the adjacent mine count (or a mine) when it is revealed. Do the same thing when flagging a square.


## Challenges: 

Many features were breaking after the reset was implemented because not all values were set back to their original state.

Had to impose limits on board size because board generator would end up exceeding max call stack limit.

CSS.

## Additional information:

Stretch goals:

Choose different grid sizes / mine amounts (done)

Add ability to store and view high scores across sessions

build option where game will always be solvable based on deductions, with no guessing required


## App Demo 
Link to GitHub project (i.e. - username.github.io)