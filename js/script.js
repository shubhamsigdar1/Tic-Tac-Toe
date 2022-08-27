//grab all the element of class of tile
let tiles = Array.from(document.querySelectorAll('.tile'))
// console.log('Array.frometiles',tiles)[div.tile, div.tile, div.tile, div.tile, div.tile, div.tile, div.tile, div.tile, div.tile]

//array for all winning combinations
const winCons = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

//setting arrays to show players choices (will use to compare to the winning combinations later)
let player1State = []

let player2State = []


let h2 = document.querySelector('h2')
h2.innerText = `Player 1's Turn`

//Turns
let turn = 1
//Player1 Turn
let toggleX = (click) => {
  if (turn === 1){
      //blocks from allowing multiple selections on a tile
      if(click.target.classList.contains('o')){
		// console.log(click.target)
          alert('Please choose another tile')
      }
      else{
          //allows player1 to choose tile and changes class to 'x' allowing img to display
          click.target.classList.add('x');
          //sets delay for showing next players turn
        //assigns tiles to player1 selections; to be compared to winning combinations
           player1State = tiles
                    .map((t, i) =>  t.classList.contains('x') ? i : 'skip')
                    .filter((e, i) => e !== 'skip')
         //check if you won! 
		        console.log('player1',player1State)
            if (!checkWin()){
              setTimeout(function(){h2.innerText = `Player 2's Turn`},250)
            //switch counter to player 2 turn
               turn = 2
    }
  }
} 
  else if (turn === 2){
      if(click.target.classList.contains('x')){
        alert('Please choose another tile')
  } else {
      click.target.classList.add('o')
        //assigns tiles to player1 selections; to be compared to winning combinations  
    player2State = tiles
                    .map((t, i) =>  t.classList.contains('o') ? i : 'skip')
                    .filter((e, i) => e !== 'skip')
    console.log('player2',player2State)

        //check if you won! 
    if (!checkWin()){      
        //sets delay for showing next players turn
      setTimeout(function(){h2.innerText = `Player 1's Turn`},250)
        //switch counter to player 1 turn
      turn = 1
    }
  }
  }
}

//add event listener to all board tiles
tiles.forEach(tile => tile.addEventListener('click', toggleX))
console.log('tilestesting',tiles)

//event listener for reset button:
let resetBtn = document.querySelector('.resetBtn').addEventListener("click",reset);
//reset function to clear the board
function reset () {
  player1State = []
  player2State = []
 
  turn = 1

  tiles.forEach(tile => {
    tile.classList.remove('x')
    tile.classList.remove('o')
  })

  h2.innerText = `Player 1's Turn`
  tiles.forEach(tile => tile.addEventListener('click', toggleX))
}



//check win function to compare player state array with winning combinations
function checkWin() {
  const p1 = winCons.some(combo => {
	// console.log('combotesting',combo)
    return combo.every(e => player1State.includes(e))
  })
  const p2 = winCons.some(combo => {
    return combo.every(e => player2State.includes(e))
  })

  if(p1){
    // alert('Player 1 wins!')
    h2.innerText = `Player 1 Wins`
    //add event listener to all board tiles 
  tiles.forEach(tile => tile.removeEventListener('click', toggleX))
    return true
  } 
  if(p2) {
    // alert('Player 2 wins!')
    h2.innerText = `Player 2 Wins`
    //add event listener to all board tiles 
  tiles.forEach(tile => tile.removeEventListener('click', toggleX))
    return true
  }
  if (player1State.length + player2State.length == 9){
    h2.innerText = "Draw!"
    return true
  }
  return false
}

