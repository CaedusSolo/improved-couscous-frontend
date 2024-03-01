const btnEl = document.getElementById("btn");
const factEl = document.querySelector('.fact')


btnEl.addEventListener("click", () => {
  fetch("https://meowfacts.herokuapp.com/")
    .then((res) => res.json())
    .then((result) => {
      const fact = result.data[0];
      factEl.textContent = fact;
    });
});
