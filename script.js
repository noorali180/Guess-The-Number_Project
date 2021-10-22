'use strict'

// selecting elements...
const againBtn = document.querySelector('.again__btn');
const checkBtn = document.querySelector('.check__btn');
const number = document.querySelector('.number');
const guessed = document.querySelector('.guessed__number');
const message = document.querySelector('.message');
const scoreLabel = document.querySelector('.score');
const highscoreLabel = document.querySelector('.highscore');

// make a random number between 1 and 20...
let random = Math.trunc(Math.random() * 20 + 1);

// set inital values for score and highscore...
let score = 20;
let highscore = 0;

scoreLabel.textContent = `${score}`;

// function to check the guessed number with randomly generated number...
const checkFunc = function(e){
    e.preventDefault();
    const guessedNumber = +guessed.value;
    // if score is not equal to zero...
    if(score > 1){
        // validation for the guessed number...
        if(guessedNumber > 0 && guessedNumber <=20){
            // checking the conditions...
            if(guessedNumber > random) {
                score--;
                message.textContent = '📈 too high!';
                scoreLabel.textContent = `${score}`;
    
                guessed.value = '';
                guessed.blur();
            }
            else if(guessedNumber < random) {
                score--
                message.textContent = '📉 too low!';
                scoreLabel.textContent = `${score}`;
    
                guessed.value = '';
                guessed.blur();
            }
            else {
                // highsocre should only updated, if highscore is less than the current score... 
                highscore = highscore >= score ?  highscore : score;

                message.textContent = '🎉 correct guess!';
                highscoreLabel.textContent = `${highscore}`;
                number.textContent = `${random}`;
                document.body.style.backgroundColor = 'green';
    
                guessed.blur();
                checkBtn.removeEventListener('click', checkFunc);
            }  
        }
    }
    else{
        score--;
        message.textContent = '😢 You LOSS the game!';
        scoreLabel.textContent = `${score}`;
        number.textContent = `${random}`;
        document.body.style.backgroundColor = 'red';

        guessed.blur();
        checkBtn.removeEventListener('click', checkFunc);
    }
    
}

// function to replay the game, competing the same highscore...
const againFunc = function(e){
    e.preventDefault();

    random = Math.trunc(Math.random() * 20 + 1);
    score = 20;
    scoreLabel.textContent = `${score}`;
    message.textContent = 'Start guessing...';
    number.textContent = '?';
    document.body.style.backgroundColor = '#333';

    guessed.value = '';
    checkBtn.addEventListener('click', checkFunc);
}

// event listener for check button...
checkBtn.addEventListener('click', checkFunc);

// event listener for again button...
againBtn.addEventListener('click', againFunc);
