
/*------Constants------*/
const colors = {
    '1': 'purple',
    '-1': 'yellow',
    'null': 'white',
}
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const priceIsWrong = new Audio('audio/Price-is-right-losing-horn.wav')
const blip = new Audio('audio/blip.wav')
const kazoo = new Audio('audio/kazoo.wav')

/*------Variables (state)------*/

let board, turn, winner

// Variables might include (board/turn/winner)

/*------Cached Element References------*/


// You might choose to put your game status here
const messageEl = document.getElementById('message') 
const squaresEl = document.querySelectorAll('div')
const resetBtn = document.getElementById('resetButton')
/*------Event Listeners------*/

// This is where you should put the event listener
// for a mouse-click
// On-Click 
// Set up what happens when one of the elements
// is clicked
document.querySelector('section').addEventListener('click', playerMove)


// 6) Handle a player clicking the replay button:
// 	6.1) Do steps 4.1 (initialize the state variables) and 4.2 (render).
resetBtn.addEventListener('click', init)

/*------Functions------*/

init()
// Some functions you might choose to use:

// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading
//4.1) Initialize the state variables:
// 		4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
// 		4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
// 		4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 
function init(){
    board = [null, null, null, null, null, null, null, null, null]
    turn = 1
    winner = checkWinner()
    render()
    messageEl.className = "no bounce"
}





// 5) Handle a player clicking a square:
// 	5.1) Obtain the index of the square that was clicked by either:
// 		5.1.1) "Extracting" the index from an id assigned to the element in the HTML, or
// 		5.1.2) Looping through the cached square elements using a for loop and breaking out when the current square element equals the event object's target.
// 	5.2) If the board has a value at the index, immediately return because that square is already taken.
// 	5.3) If winner is not null, immediately return because the game is over.
// 	5.4) Update the board array at the index with the value of turn.
// 	5.5) Flip turns by multiplying turn by -1 (flips a 1 to -1, and vice-versa).


function playerMove(e){
    const idx = parseInt(e.target.id.replace('sq', ''))
    setTimeout(function(){blip.play();},0);
    if (board[idx] || winner) return
    board[idx] = turn
    turn *= -1
    winner = checkWinner()
    render()
}

//this is calling on another function will be its own function rather than a nested function incase we need to call on this function elsewhere  
//      5.6) Set the winner variable if there's a winner:
// 		5.6.1) Loop through the each of the winning combination arrays defined.
// 		5.6.2) Total up the three board positions using the three indexes in the current combo.
// 		5.6.3) Convert the total to an absolute value (convert any negative total to positive). done with Math.abs
// 		5.6.4) If the total equals 3, we have a winner! Set winner to the board's value at the index specified by the first index in the combo array. Exit the loop. for loop 
// 	5.7) If there's no winner, check if there's a tie:
// 		5.7.1) Set winner to 'T' if there are no more nulls in the board array. simply return T 
// 	5.8) All state has been updated, so render the state to the page (step 4.2). playe rmove already renders it does not need to be called again here

// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so
function checkWinner(){
    for (let i = 0; i < winningCombo.length; i++) {
        if (Math.abs(board[winningCombo[i][0]] + board[winningCombo[i][1]] + board[winningCombo[i][2]]) === 3) return board[winningCombo[i][0]];
    }
    if (board.includes(null)) return null
    return 'T'
}

// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// either X or O depending on whose turn it is
// 	4.2) Render those state variables to the page:
// 		4.2.1) Render the board:  this will be a for each loop
// 			4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration: 
// 				4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
// 				4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
// 		4.2.2) Render a message:
// 			4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
// 			4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
// 			4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.
// 	4.3) Wait for the user to click a square
function render(){
    board.forEach(function(sq, idx){
        squaresEl[idx].style.background = colors[sq]
    })
    if (winner === 'T'){
        messageEl.innerHTML = 'Your game has ended in a tie!'
        setTimeout(function(){priceIsWrong.play();},500);
     } else if (winner){
        messageEl.innerHTML = `Congrats to ${colors[winner].toUpperCase()} you are the winner!`
        setTimeout(function(){kazoo.play();},0);
        confetti.start(3800)
        messageEl.className = "animate__animated animate__bounce"
    } else {
        messageEl.innerHTML = `It is ${colors[turn].toUpperCase()}'s turn`
    }
};