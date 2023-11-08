const convertBtn = document.getElementById("convert-btn");
const inputFieldEl = document.getElementById("input-field-el");
const lengthConversionsEl = document.getElementById("length-conversions-el");
const volumeConversionsEl = document.getElementById("volume-conversions-el");
const massConversionsEl = document.getElementById("mass-conversions-el");

document.addEventListener("DOMContentLoaded", function () {
  inputFieldEl.focus();
});

convertBtn.addEventListener("click", getNumber);

function getNumber() {
  const amount = Number(inputFieldEl.value);

  if (isNaN(amount)) {
    alert("Please enter only numbers");
    inputFieldEl.value = "";
    return;
  } 
  else {
    inputFieldEl.value = "";
    const lengthConversions = calculateLengthConversions(amount);
    const massConversions = calculateMassConversions(amount);
    const volumeConversions = calculateVolumeConversions(amount);

    renderConversions(
      amount,
      lengthConversions,
      massConversions,
      volumeConversions
    );
  }
}

function calculateLengthConversions(number) {
  const metresToFeet = (number * 3.281).toFixed(3);
  const feetToMetres = (number / 3.281).toFixed(3);

  return [metresToFeet, feetToMetres];
}

function calculateVolumeConversions(number) {
  const litresToGallons = (number * 0.264).toFixed(3);
  const gallonsToLitres = (number * 0.264).toFixed(3);

  return [litresToGallons, gallonsToLitres];
}

function calculateMassConversions(number) {
  const kilogramsToPounds = (number * 2.204).toFixed(3);
  const poundsToKilograms = (number / 2.204).toFixed(3);

  return [kilogramsToPounds, poundsToKilograms];
}

function renderConversions(
  number,
  lengthConversionsArr,
  volumeConversionsArr,
  massConversionsArr
) {
  lengthConversionsEl.textContent = `${number} metres = ${lengthConversionsArr[0]} feet | ${number} feet = ${lengthConversionsArr[1]} metres`;

  volumeConversionsEl.textContent = `${number} litres = ${volumeConversionsArr[0]} gallons | ${number} gallons = ${volumeConversionsArr[1]} litres`;

  massConversionsEl.textContent = `${number} kilograms = ${massConversionsArr[0]} pounds | ${number} pounds = ${massConversionsArr[1]} kilograms`;
}