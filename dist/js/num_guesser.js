/*GAME FUNCTION
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again*/

// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
// Note: e is the event object, the play-again class is the pointing to the object.
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

//Listen for guess
guessBtn.addEventListener('click', function() {
  let guess = parseInt(guessInput.value); /*converting string into number value, using parseInt*/

  // Valildate
  // Note: NaN = Not a Number.
  if ( isNaN(guess) || guess < min || guess > max  ) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
  }

  // Check if won
  if(guess === winningNum ){
    // Game Over - Won

    gameOver(true, `${winningNum} is correct! You are a WINNER!`);

    /*// Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = 'green';
    // Set Message
    setMessage(`${winningNum} is correct! You are a WINNER!`, 'green');
*/
  } else {
    //Wrong number
    /*guessesLeft = guessesLeft -1*/ /*Note: Could also be written this way.*/
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over - Lost

      gameOver(false, `Game Over, you LOST! The correct number was ${winningNum}`);

      /*// Disable input
      guessInput.disabled = true;
      // Change border color
      guessInput.style.borderColor = 'red';
      // Set Message
      setMessage(`Game Over, you LOST! The correct number was ${winningNum} `, 'red');*/

    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';

      //Clear input
      guessInput.value = '';

      // Tell user its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Game Over
function gameOver(won, msg){
  let color;
  /*If won is true display green or red if won is false.*/
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set Message
  setMessage(msg);

  // Play Again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again'; /*We are appending the class name play-again to the guessBtn.*/

}

// Get Winning number
//function to make up random number.
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min+1)+min); /*Give us a random number between 1-10*/ /*Math.floor makes whole number*/

}


// Set Message
// Note: this will display the setMessage into the <p>.
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}






//
