const colourSelectorEl = document.getElementById("colour-selector");
const modeSelectorEl = document.getElementById("mode-selection");
const getBtn = document.getElementById("get-btn");

const firstColourEl = document.getElementById("colour-1");
const secondColourEl = document.getElementById("colour-2");
const thirdColourEl = document.getElementById("colour-3");
const fourthColourEl = document.getElementById("colour-4");
const fifthColourEl = document.getElementById("colour-5");

const coloursEl = [
  firstColourEl,
  secondColourEl,
  thirdColourEl,
  fourthColourEl,
  fifthColourEl,
];
const hexCodes = document.querySelectorAll(".hex-code");

function getColourScheme(e) {
  const colour = colourSelectorEl.value.substring(1);
  const mode = modeSelectorEl.value;
  e.preventDefault();
  fetch(`https://www.thecolorapi.com/scheme?hex=${colour}&mode=${mode}`)
    .then((res) => res.json())
    .then((data) => {
      const coloursInfo = data.colors; // array of objects [{}, {}, {}, {}, {}]
      let coloursArr = [];
      for (let colour of coloursInfo) {
        coloursArr.push(colour.hex.value);
      }
      renderColourScheme(coloursArr);
    });
}

function renderColourScheme(coloursArr) {
  coloursEl.forEach((colourEl, index) => {
    colourEl.style.backgroundColor = coloursArr[index];
    const hexCodeEl = colourEl.parentElement.querySelector(".hex-code");
    hexCodeEl.innerText = coloursArr[index];
  });
}

colourSelectorEl.addEventListener("input", (e) => {
  console.log(e.target.value);
});

colourSelectorEl.addEventListener("change", (e) => {
  console.log(e.target.value);
});

getBtn.addEventListener("click", getColourScheme);

hexCodes.forEach((hexCode) => {
  hexCode.addEventListener("click", () => {
    const hexCodeEl = hexCode.closest(".colour").querySelector(".hex-code");
    navigator.clipboard
      .writeText(hexCodeEl.innerText)
      .then(() => {
        alert("Hex code successfully copied to clipboard");
      })
      .catch(() => {
        console.error("Failed to copy hex code to clipboard");
      });
  });
});