'use strict';


const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
// const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;

//Big score(.score) array for both players
let scores = [0, 0];

//to keep track of which player is playing
let activePlayer = 0;

let playing = true;

//rolling dice functionality
btnRoll.addEventListener('click', function() {
    if (playing) {
        //1.generate a random dice
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `./dice-${dice}.png`;
        //3.check for 1, if true switch to next player
        if (dice !== 1) {
            //add dice to current score
            currentScore = currentScore + dice;

            document.querySelector(`#current--${activePlayer}`).textContent =
                currentScore;
        } else {
            //switch to next player
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            currentScore = 0;

            if (activePlayer === 1) {
                activePlayer = 0;
            } else {
                activePlayer = 1;
            }

            //instead of checking if the class is present and then add or remove it use this
            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }
    }

});


btnhold.addEventListener('click', function() {
    if (playing) {
        //1. add current score to active player's score
        scores[activePlayer] += currentScore;

        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];


        //2. check if the player's score is >=20
        if (scores[activePlayer] >= 20) {
            //finish the game
            playing = false;
            diceEl.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            //3. switch to the next player
            document.querySelector(`#current--${activePlayer}`).textContent = 0;
            currentScore = 0;

            if (activePlayer === 1) {
                activePlayer = 0;
            } else {
                activePlayer = 1;
            }

            player0El.classList.toggle('player--active');
            player1El.classList.toggle('player--active');
        }

    }
});



btnNew.addEventListener('click', function() {
    diceEl.classList.add('hidden');

    if (!player0El.classList.contains('player--active')) {
        player0El.classList.add('player--active');
    }
    if (player1El.classList.contains('player--active')) {
        player1El.classList.remove('player--active');
    }
    if (player0El.classList.contains('player--winner') || player1El.classList.contains('player--winner')) {
        player0El.classList.remove('player--winner');
        player1El.classList.remove('player--winner');
    }
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = 0;
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;

    playing = true;
    activePlayer = 0;
    currentScore = 0;
    scores = [0, 0];

});