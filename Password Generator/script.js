const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];
const letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const passwordLengthEl = document.getElementById("password-length-el");
const includeNumbersInputEl = document.getElementById(
  "include-numbers-input-el"
);
const includeSymbolsInputEl = document.getElementById(
  "include-symbols-input-el"
);
const generatePasswordBtn = document.getElementById("generate-btn");
const passwordEl = document.querySelectorAll(".password-el");

generatePasswordBtn.addEventListener("click", renderPassword);


function generatePassword() {
  const includeNumbers = includeNumbersInputEl.checked;
  const includeSymbols = includeSymbolsInputEl.checked;
  const passwordLength = passwordLengthEl.value;
  const charsArr = [letters];
  const parameters = {
    includeNumbers: includeNumbers,
    includeSymbols: includeSymbols,
  };
  const characterSets = {
    includeNumbers: numbers,
    includeSymbols: symbols,
  };
  let password = "";
  let finalArr = [];

  for (let parameter in parameters) {
    if (parameters[parameter]) {
      charsArr.push(characterSets[parameter]);
    }
  }

  for (let i = 0; i < charsArr.length; i++) {
    finalArr.push(...charsArr[i]);
  }

  for (let i = 0; i < passwordLength; i++) {
    password += finalArr[Math.floor(Math.random() * finalArr.length)];
  }
  return password;
}

function renderPassword() {
  if (passwordLengthEl.value === 0 || passwordLengthEl.value < 5) {
    alert("Minimum length of the password is 5!");
    return;
  }

  passwordEl.forEach((el) => {
    el.textContent = generatePassword();
    el.addEventListener('click',copyToClipboard)
    el.classList.add('hover')
  });
}

function copyToClipboard() {
  const textToCopy = this.textContent;
  if (textToCopy.length === 0) {
    return
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(textToCopy)
      .then(function() {
        alert("Successfully copied to clipboard.");
      })
      .catch(function() {
        alert("Failed to copy password");
      });
  } 
  else {
    alert("Browser not compatible")
  }
}