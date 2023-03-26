const rulesBtn = document.querySelector(".rules_btn");
const closeBtn = document.querySelector(".close-btn");
const modalRules = document.querySelector(".rulesModel");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const container = document.querySelector(".container");
const gameSec = document.querySelector(".game_section");
const choiceButton = document.querySelectorAll(".choice-btn");
const resultSec = document.querySelector(".results");
const resultsdivs = document.querySelectorAll(".results_result");
const hurrayDiv = document.querySelector(".hurray");

const resultWinner = document.querySelector(".results_winner");
const resultText = document.querySelector(".result_text");

const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".next_btn");

let pScore = 0;
let cScore = 0;

pScore = localStorage.getItem("pScore");
cScore = localStorage.getItem("cScore");
document.querySelector(".human-score").innerHTML = pScore;
document.querySelector(".computer-score").innerHTML = cScore;

choiceButton.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});
function choose(choice) {
  const computerchoice = computerChoose();
  displayResults([choice, computerchoice]);
  displayWinner([choice, computerchoice]);
}
function computerChoose() {
  const random = Math.floor(Math.random() * 3);
  return CHOICES[random];
}

function displayResults(results) {
  resultsdivs.forEach((resultSec, index) => {
    setTimeout(() => {
      resultSec.innerHTML = `
     <div class ="choice ${results[index].name}">
     <img src="${results[index].name}.png" alt="${results[index].name}"
     />
     </div>
     <h2 class="choice-option">${results[index].name}</h2>
     `;
    }, index * 1000);
  });
  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const computerWins = isWinner(results.reverse());
    if (userWins) {
      resultText.innerText = "you win";
      resultsdivs[0].classList.toggle("winner");
      pScore++;
      updateScore();
      nextBtn.classList.remove("hidden");
    } else if (computerWins) {
      resultText.innerText = "you lost";
      resultsdivs[1].classList.toggle("winner");
      cScore++;
      updateScore();
    } else {
      resultText.innerText = " tie up";
      playAgainBtn.innerText = "replay";
    }
    resultWinner.classList.toggle("hidden");
    resultSec.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}
function playAgain() {
  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");

  resultsdivs.forEach((resultdiv) => {
    resultdiv.innerHTML = "";
    resultdiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultSec.classList.toggle("show-winner");
  nextBtn.classList.add("hidden");
}

// score
function updateScore() {
  const playerScore = document.querySelector(".human-score");
  const computerScore = document.querySelector(".computer-score");

  playerScore.textContent = pScore;
  computerScore.textContent = cScore;
  localStorage.setItem("pScore", pScore);
  localStorage.setItem("cScore", cScore);
}
function showHurray() {
  hurrayDiv.classList.toggle("hidden");
  container.classList.add("hidden");
}
// modle show /hide
rulesBtn.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
closeBtn.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

const playAgainOnHurrayPage = () => {
  container.classList.remove("hidden");
  gameSec.classList.toggle("hidden");
  resultSec.classList.toggle("hidden");

  resultsdivs.forEach((resultdiv) => {
    resultdiv.innerHTML = "";
    resultdiv.classList.remove("winner");
  });
  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultSec.classList.toggle("show-winner");
  hurrayDiv.classList.toggle("hidden");
  nextBtn.classList.add("hidden");
};
