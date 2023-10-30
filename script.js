"use strict";
// select elements
const playerEl0 = document.querySelector(".player-0");
const playerEl1 = document.querySelector(".player-1");
const scoreEl0 = document.getElementById("score-0");
const scoreEl1 = document.getElementById("score-1");
const scorePl1 = document.getElementById("current-0");
const scorePl2 = document.getElementById("current-1");
const diceEl = document.querySelector(".dice");
const newGame = document.querySelector(".btn-new");
const rowDice = document.querySelector(".btn-roll");
const btnHoldScore = document.querySelector(".btn-hold");

let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEl0.textContent = 0;
  scoreEl1.textContent = 0;
  scorePl1.textContent = 0;
  scorePl2.textContent = 0;

  diceEl.classList.add("hidden");
  playerEl0.classList.remove("player-winner");
  playerEl1.classList.remove("player-winner");
  playerEl0.classList.add("player-active");
  playerEl1.classList.remove("player-active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle checks is element is there and remove it if it is not there is added it
  playerEl0.classList.toggle("player-active");
  playerEl1.classList.toggle("player-active");
};

// rowing dice functionality
rowDice.addEventListener("click", function () {
  if (playing) {
    // Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //  Display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `/images/dice-${dice}.png`;

    // Checking for if the dice is 1, switch to other player
    if (dice === 1) {
      //switch to other player
      switchPlayer();
    } else {
      //switch to next player
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHoldScore.addEventListener("click", function () {
  if (playing) {
    //Add current player score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player score is >= 100, finish the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add("player-winner");
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove("player-active");
      diceEl.classList.add("hidden");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

newGame.addEventListener("click", init);
