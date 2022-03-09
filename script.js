const gameResultInfo = document.querySelector("#gameResultInfo");
const gameResultMessage = document.querySelector("#gameResultMessage");
const playerScoreText = document.querySelector("#playerScore");
const computerScoreText = document.querySelector("#computerScore");
const playerSign = document.querySelector("#playerSign");
const computerSign = document.querySelector("#computerSign");
const allButtons = document.querySelectorAll(".btn");
const dogBtn = document.querySelector("#dogBtn");
const catBtn = document.querySelector("#catBtn");
const mouseBtn = document.querySelector("#mouseBtn");

let playerScore = 0;
let computerScore = 0;
let roundWinner = "";

function computerPlay() {
  let choices = ["dog", "cat", "mouse"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function updateGameResult() {
  if (roundWinner === "player" && playerScore === 5) {
    gameResultInfo.style.color = "#00ff00";
    gameResultInfo.textContent = "You won the game!";
    gameResultMessage.textContent = "Refresh page to play again.";
  } else if (roundWinner === "player") {
    gameResultInfo.textContent = "You won!";
  } else if (roundWinner === "computer" && computerScore == 5) {
    gameResultInfo.style.color = "#ff0000";
    gameResultInfo.textContent = "You lost the game!";
    gameResultMessage.textContent = "Refresh page to play again.";
  } else if (roundWinner === "computer") {
    gameResultInfo.textContent = "You lost!";
  } else {
    gameResultInfo.textContent = "It's a tie round!";
  }

  playerScoreText.textContent = `Player: ${playerScore}`;
  computerScoreText.textContent = `Computer: ${computerScore}`;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateGameResultMessage(winner, playerSelection, computerSelection) {
  if (winner === "player") {
    gameResultMessage.textContent = `${capitalize(
      playerSelection
    )} beats ${computerSelection}.`;
  } else if (winner === "computer") {
    gameResultMessage.textContent = `${capitalize(
      playerSelection
    )} is beaten by ${computerSelection}.`;
  } else {
    gameResultMessage.textContent = `${capitalize(
      playerSelection
    )} ties with ${computerSelection}.`;
  }
}

function playRound(playerSelection, computerSelection) {
  if (
    (playerSelection === "dog" && computerSelection === "cat") ||
    (playerSelection === "cat" && computerSelection === "mouse") ||
    (playerSelection === "mouse" && computerSelection === "dog")
  ) {
    playerScore += 1;
    roundWinner = "player";
  } else if (
    (computerSelection === "dog" && playerSelection === "cat") ||
    (computerSelection === "cat" && playerSelection === "mouse") ||
    (computerSelection === "mouse" && playerSelection === "dog")
  ) {
    computerScore += 1;
    roundWinner = "computer";
  } else if (playerSelection === computerSelection) {
    roundWinner = "tie";
  }

  updateGameResultMessage(roundWinner, playerSelection, computerSelection);
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case "dog":
      playerSign.textContent = "🐶";
      break;
    case "cat":
      playerSign.textContent = "🐱";
      break;
    case "mouse":
      playerSign.textContent = "🐭";
      break;
  }

  switch (computerSelection) {
    case "dog":
      computerSign.textContent = "🐶";
      break;
    case "cat":
      computerSign.textContent = "🐱";
      break;
    case "mouse":
      computerSign.textContent = "🐭";
      break;
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5;
}

function handleGameOver() {
  allButtons.forEach((button) => {
    button.disabled = true;
  });
}

function handleClick(playerSelection) {
  if (isGameOver()) {
    handleGameOver();
  } else {
    let computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    updateChoices(playerSelection, computerSelection);
    updateGameResult();
  }
}

dogBtn.addEventListener("click", () => handleClick("dog"));
catBtn.addEventListener("click", () => handleClick("cat"));
mouseBtn.addEventListener("click", () => handleClick("mouse"));
