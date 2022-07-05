'use strict';

const player1Card = document.querySelector('.player--1');
const player2Card = document.querySelector('.player--2');
const player1Title = document.getElementById('name--1');
const player2Title = document.getElementById('name--2');

const score1 = document.querySelector('#score--1');
const score2 = document.getElementById('score--2');
const currentScore1 = document.getElementById('current--1');
const currentScore2 = document.getElementById('current--2');

const dice = document.querySelector('.gameplay__dice');
const dice1 = document.querySelector('.gameplay__dice__img-1');
const dice2 = document.querySelector('.gameplay__dice__img-2');

const btnNew = document.querySelector('.gameplay__buttons__btn--new');
const btnRoll = document.querySelector('.gameplay__buttons__btn--roll');
const btnHold = document.querySelector('.gameplay__buttons__btn--hold');


const popup = document.querySelector('.popup');
const esc = document.querySelector('.popup__esc');

const body = document.querySelector('.grid');

let scores, currentScore, activePlayer, playing;

const init = () => {
  scores = [0, 0, 0];
  currentScore = 0;
  activePlayer = 1;
  playing = true;

  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;

  player1Card.classList.remove('player--winner');
  player2Card.classList.remove('player--winner');
  player1Card.classList.add('player--active');
  player2Card.classList.remove('player--active');

  player1Title.textContent = ("Player 1");
  player2Title.textContent = ("Player 2");
}
esc.addEventListener('click', function() {
  popup.classList.add('hidden');
});

init();

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1Card.classList.toggle('player--active');
  player2Card.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRoll1 = Math.trunc(Math.random() * 6) + 1;
    const diceRoll2 = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    dice1.src = `img/dice-${diceRoll1}.png`;
    dice2.src = `img/dice-${diceRoll2}.png`;

    // 3. Check for rolled 1
    if (diceRoll1 !== 1 && diceRoll2 !==1 ) {
      // Add dice to current score
      currentScore += diceRoll1 + diceRoll2;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;

      // document
      //   .querySelector(`.player--${activePlayer}`)
      //   .classList.add('winner');
        document
        .getElementById(`name--${activePlayer}`)
        .textContent = (`Player ${activePlayer} wins!`);
        // body.addEventListener('click', function (){
        //   document.querySelector(`.player--${activePlayer}`).classList.remove('winner'); 
        // });
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);



