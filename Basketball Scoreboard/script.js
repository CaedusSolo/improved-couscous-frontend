const startersScoreEl = document.getElementById('starters-score')
const benchScoreEl = document.getElementById('bench-score')
const startersAddOneBtn = document.getElementById('starters-add-one-btn')
const startBtn = document.getElementById('start-btn')
const endBtn = document.getElementById('end-btn')
const newBtn = document.getElementById('new-btn')
const winnerMsg = document.getElementById('winner-banner')
const addScoreBtns = document.querySelectorAll('.btn')

let startersScore = 0;
let benchScore = 0;

disableEndBtn()
disableNewBtn()
disableAddBtns()

// Functions
function disableAddBtns() {
    addScoreBtns.forEach((btn) => {
        btn.disabled = true;
    })
}

function enableAddBtns() {
    addScoreBtns.forEach((btn) => {
        btn.disabled = false;
    })
}

function disableEndBtn() {
    endBtn.disabled = true;
}

function disableNewBtn() {
    newBtn.disabled = true
}

function initializeGame() {
    startersScoreEl.textContent = 0;
    benchScoreEl.textContent = 0;
    startBtn.disabled = true;
    endBtn.disabled = false;
    enableAddBtns()
}; 

function anotherGame() {
    startBtn.disabled = false;
    endBtn.disabled = true;
    startersScoreEl.textContent = "PRESS START"
    benchScoreEl.textContent = "PRESS START"
}

function startersAddOne() {
    startersScore += 1;
    startersScoreEl.textContent = startersScore;
}; 

function startersAddTwo() {
    startersScore += 2;
    startersScoreEl.textContent = startersScore;
}

function startersAddThree() {
    startersScore += 3;
    startersScoreEl.textContent = startersScore;
}

function benchAddOne() {
    benchScore += 1;
    benchScoreEl.textContent = benchScore;
}

function benchAddTwo() {
    benchScore += 2;
    benchScoreEl.textContent = benchScore;
}

function benchAddThree() {
    benchScore += 3;
    benchScoreEl.textContent = benchScore;
}

function determineWinner() {
    if (startersScore > benchScore) {
        winnerMsg.textContent = "STARTERS WIN!"
    } 
    else if (benchScore > startersScore) {
        winnerMsg.textContent = "BENCH WINS!"
    } 
    else {
        winnerMsg.textContent = "IT'S A TIE!"
    }
    startBtn.disabled = true;
    newBtn.disabled = false;
    disableEndBtn()
}

function newGame() {
    winnerMsg.textContent = ""
    startersScore = 0;
    benchScore = 0;

    disableEndBtn()
    disableNewBtn()
    startBtn.disabled = false;
    anotherGame()
    disableAddBtns()
}