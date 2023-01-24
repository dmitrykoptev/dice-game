"use strict";

const btnNewGame = document.querySelector(".btn__new--game");
const btnRollDice = document.querySelector(".btn__roll--dice");
const btnHold = document.querySelector(".btn__hold");
const dice = document.querySelector(".dice");
const winAlert = document.querySelector(".congrats");
const openPopup = document.querySelector(".popup__open");
const closePopup = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const current0 = document.querySelector(".current--0");
const current1 = document.querySelector(".current--1");
const score0 = document.querySelector(".score--0");
const score1 = document.querySelector(".score--1");

let scores, currentPoints, activePlayer, playing;

////////////////////////
// Starting data
////////////////////////
const restartGame = function () {
  scores = [0, 0];
  currentPoints = 0;
  activePlayer = 0;
  playing = true;

  score0.textContent = 0;
  score1.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  player0.classList.add("active--player");
  player1.classList.remove("active--player");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  dice.classList.add("hidden");
};
restartGame();
////////////////////////
// Switching players
////////////////////////
const switchPlayer = function () {
  document.querySelector(`.current--${activePlayer}`).textContent = 0;
  currentPoints = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("active--player");
  player1.classList.toggle("active--player");
};

////////////////////////
// Roll Dice functionality
////////////////////////

btnRollDice.addEventListener("click", function () {
  if (playing) {
    const point = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove("hidden");
    dice.src = `/img/dice-${point}.png`;

    if (point !== 1) {
      currentPoints += point;
      document.querySelector(`.current--${activePlayer}`).textContent =
        currentPoints;
    } else {
      switchPlayer();
    }
  }
});

////////////////////////
// Hold functionality
////////////////////////

btnHold.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentPoints;
    document.querySelector(`.score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] < 100) {
      switchPlayer();
    } else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      playing = false;
      dice.classList.add("hidden");
    }
  }
});

////////////////////////
// Restart the game
////////////////////////

btnNewGame.addEventListener("click", function () {
  restartGame();
});

////////////////////////
// POPUP
////////////////////////

openPopup.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.add("active");
  openPopup.style.display = "none";
});

closePopup.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.remove("active");
  openPopup.style.display = "block";
});
