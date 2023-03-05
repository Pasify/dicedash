'use strict';

// selecting element
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const BtnNew = document.querySelector('.btn--new');
const BtnRoll = document.querySelector('.btn--roll');
const BtnHold = document.querySelector('.btn--hold');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let score, currentScore, activePlayer, playing;

const init = function () {
  // starting conditons starts here

  // diceEl.classList.add('hidden');

  // reseting the text content

  // score0El.textContent = 0;
  // score1El.textContent = 0;

  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  playing = true;
  // starting conditions end here

  // remove the winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //  switch back to player 1
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  // reset score to 0
  score0El.textContent = 0;
  score1El.textContent = 0;
  // remove dice
  diceEl.classList.add('hidden');
  // return current score to zero

  current0El.textContent = 0;
  current1El.textContent = 0;
  // document.getElementById(`current--${activePlayer}`).textContent = 0;
};
init()
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// rolling dice functionality

BtnRoll.addEventListener('click', function () {
  if (playing) {
    // generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // console.log(dice);
    // check if the dice rolled 1: if true , switch to player 2
    if (dice !== 1) {
      // add dice number to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player to next player
      switchPlayer();
    }
  }
});

BtnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to active players score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    // check if player score is >=100
    if (score[activePlayer] >= 100) {
      // finsh game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      // awitch to the next player
      switchPlayer();
    }
  }
});

BtnNew.addEventListener('click',init);
