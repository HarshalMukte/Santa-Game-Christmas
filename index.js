//geting all the section
const loading = document.querySelector(".loading");
const beforeGame = document.querySelector(".beforeGame");
const game = document.querySelector(".game");
const afterGame = document.querySelector(".afterGame");

// geting all selectors
const startGame = document.querySelector("#startGame");
const santa = document.querySelector(".santa");
const tree = document.querySelector(".tree");
const gameTimer = document.querySelector(".gameTimer");
const resetBtn = document.getElementById("restart");
const score = document.querySelector(".score");
const scoreCount = document.querySelector("#score");
const displayScore = document.querySelector(".displayScore");
let removeClass;
let scoreActive = false;
let Timer = 4;
let gameScoreCount = 0;

//functions starts
window.addEventListener("load", () => {
  setTimeout(() => {
    loading.classList.remove("active");
    beforeGame.classList.add("active");
  }, 2000);
});

let wishFunction = () => {
  afterGame.classList.add("active");
  game.classList.remove("active");
  displayScore.innerHTML = `Your Score is: <span>${gameScoreCount}</span>`
};

let timerFunction = () => {
  gameTimer.textContent = Timer;
  Timer = --Timer;
  if (Timer === 0) {
    gameTimer.textContent = "START";
    setTimeout(() => {
      gameTimer.style.display = "none";
      tree.style.animation = "block 3s linear infinite";
    }, 1000);
  } else {
    gameTimer.style.display = "flex";
    gameTimer.textContent = Timer;
    gameScoreCount = 0;
  }
};

let startGameFunction = () => {
  gameScoreCount = 0;
  scoreCount.textContent = gameScoreCount;
  Timer = 4;
  beforeGame.classList.remove("active");
  game.classList.add("active");
  let timeInterval = setInterval(() => {
    if (Timer > 0) {
      timerFunction();
      score.classList.remove("active");
    } else {
      clearInterval(timeInterval);
      score.classList.add("active");
    }
  }, 1000);
};

let jumpFunction = () => {
  if (game.classList.contains("active") && Timer === 0) {
    if (santa.classList != "jump") {
      clearTimeout(removeClass);
      santa.classList.add("jump");
      
    }
    //for geting scores
    setTimeout(() => {
        if (scoreActive) {
            gameScoreCount = gameScoreCount + 1;
            scoreCount.textContent = gameScoreCount;
        }
    }, 1000);

    removeClass = setTimeout(() => {
      santa.classList.remove("jump");
    }, 1500);
  }
};

let checkDead = setInterval(() => {
  let santaTop = parseInt(
    window.getComputedStyle(santa).getPropertyValue("bottom")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(tree).getPropertyValue("left")
  );
  if (
    blockLeft > 150 &&
    blockLeft < 300 &&
    santaTop < 170 &&
    game.classList.contains("active")
  ) {
    scoreActive = false;
    tree.style.left = `${blockLeft}px`;
    tree.style.right = "unset";
    tree.style.animation = "none";
    setTimeout(() => {
      wishFunction();
      scoreCount.textContent = gameScoreCount;
      score.classList.remove("active");
      tree.style.left = "unset";
      tree.style.right = "-20%";
    }, 800);
  }else if( blockLeft < 145  ){
      scoreActive = true;
  }
}, 10);

startGame.addEventListener("click", startGameFunction);
document.addEventListener("keypress", jumpFunction);
document.addEventListener("click", jumpFunction);
resetBtn.addEventListener("click", () => {
  afterGame.classList.remove("active");
  beforeGame.classList.add("active");
});


//for mediaQuery
let mediaScreen = window.matchMedia("(max-width: 750px)");
let gameAlert = document.getElementById("gameAlert");

function mediaQueryFunction(x) {
  if (x.matches) { // If media query matches
    gameAlert.classList.add("active");
 } else {
  gameAlert.classList.remove("active");
}
}

mediaQueryFunction(mediaScreen)
mediaScreen.addListener(mediaQueryFunction)

// to stop the inspect element
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", (e) => {
  (e.ctrlKey || 123 == e.keyCode) && (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.shiftKey &&
    e.keyCode == "I".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.shiftKey &&
    e.keyCode == "J".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});

document.addEventListener("keydown", (e) => {
  e.ctrlKey &&
    e.keyCode == "U".charCodeAt(0) &&
    (e.preventDefault(), e.stopPropagation());
});
