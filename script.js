'use strict';
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1');
const current0 = document.querySelector('#current--0');
const current1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const palyer0El = document.querySelector('.player--0')
const palyer1El = document.querySelector('.player--1')

let scores,currentScore,activePlayer,playing;

const init = function() {
scores = [0,0];
currentScore = 0
activePlayer = 0;
playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
current0.textContent = 0;
current1.textContent = 0;

diceEl.classList.add('hidden');
palyer0El.classList.remove('player--winner');
palyer1El.classList.remove('player--winner');
palyer0El.classList.add('player--active');
palyer1El.classList.remove('player--active');

}
init();

let switchinPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    palyer0El.classList.toggle('player--active');
    palyer1El.classList.toggle('player--active');
}

//click event to the roll 
btnRoll.addEventListener('click',function(){
   if (playing) {
        // generat random Dice
    let dice = Math.floor(Math.random()*6) + 1;
    console.log(dice);

    //display the Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    
    //check if the Dice is 1
    if (dice !== 1) {
        // add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }else{
        //switch to next player
        switchinPlayer();
    }
   }

});

btnHold.addEventListener('click',function(){
    if (playing) {
        //add the score to the global
    scores[activePlayer] += currentScore;
    //display the score to the global score 
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
    //cheking if the number 100 or more
    if (scores[activePlayer] >= 20) {
        diceEl.classList.add('hidden');
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }else{
    //switching player
    switchinPlayer();
    }
    }
});

btnNew.addEventListener('click',init);