'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = (message) => {
  document.querySelector('.message').textContent = message;
};

const displayScore = (value) => {
  document.querySelector('.score').textContent = value;
};

const checkNumber = () => {
  const guess = Number(document.querySelector('.guess').value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('Correct number! 🎉');
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '⬆️ Too high' : '⬇️ Too low');
      score -= 1;
      displayScore(score);
    } else {
      displayMessage('Sorry, you lost the game!');
      displayScore(0);
    }
  }
};

const resetGame = () => {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  displayScore(score);
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
};

document.querySelector('.check').addEventListener('click', checkNumber);
document.querySelector('.again').addEventListener('click', resetGame);
