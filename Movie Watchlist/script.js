const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("searchbar");
const movieSearchMainEl = document.getElementById("movie-search-main");
const addToWatchlistBtns = document.querySelectorAll(".fa-circle-plus");
const removeFromWatchlistBtns = document.querySelectorAll(".fa-circle-minus");
const myWatchlistEl = document.getElementById("watchlist-el");
const watchlistLink = document.getElementById("watchlist-link");
let itemsInWatchlist = JSON.parse(localStorage.getItem("my-watchlist")) || [];

function addEventListenerToPlusIcon(plusIcon, data) {
  plusIcon.addEventListener("click", (e) => {
    if (itemsInWatchlist.indexOf(data) === -1) {
      addToWatchlist(e, data);
    } else {
      alert(`${data.Title} is already in your watchlist!`);
    }
  });
}

function addEventListenerToMinusIcon(minusIcon, movie) {
  minusIcon.addEventListener("click", (e) => {
    removeFromWatchlist(e, movie);
  });
}

function addToWatchlist(e, data) {
  itemsInWatchlist.push(data);
  localStorage.setItem("my-watchlist", JSON.stringify(itemsInWatchlist)); //   Saved to local storage
  getSearchResults(e);
  renderWatchlist();
}

function removeFromWatchlist(e, data) {
  const indexOfItem = itemsInWatchlist.findIndex(
    (item) => item.Title === data.Title
  );
  if (indexOfItem !== -1) {
    itemsInWatchlist.splice(indexOfItem, 1);
    localStorage.setItem("my-watchlist", JSON.stringify(itemsInWatchlist));
    e.target.closest(".movie").remove();

    const hrElements = myWatchlistEl.querySelectorAll("hr");
    hrElements[indexOfItem].remove();

    getSearchResults(e);
    if (myWatchlistEl.children.length === 0) {
      myWatchlistEl.textContent = "Your watchlist is empty.";
    }
  }
}

function renderMovies(data, renderLocation) {
  const movieRating = data["imdbRating"];

  const movieDiv = document.createElement("div");
  movieDiv.classList.add("movie");

  const movieImgEl = document.createElement("img");
  movieImgEl.setAttribute("src", data.Poster);
  movieImgEl.setAttribute("alt", data.Title);
  movieDiv.appendChild(movieImgEl);

  const movieDetailsDiv = document.createElement("div");
  const firstRowDiv = document.createElement("div");
  firstRowDiv.classList.add("first-row");

  const movieTitleEl = document.createElement("h3");
  movieTitleEl.classList.add("movie-title");
  movieTitleEl.textContent = `${data.Title} (${data.Year})`;

  const movieRatingEl = document.createElement("p");
  movieRatingEl.classList.add("movie-rating");
  movieRatingEl.textContent = `⭐ ${movieRating}`;

  firstRowDiv.append(movieTitleEl, movieRatingEl);

  const secondRowDiv = document.createElement("div");
  secondRowDiv.classList.add("second-row");
  const movieLength = document.createElement("p");
  movieLength.textContent = data.Runtime;
  const movieGenre = document.createElement("p");
  movieGenre.textContent = data.Genre;

  if (itemsInWatchlist.some((item) => item.imdbID === data.imdbID)) {
    //   if data is in watchlist
    const minusIcon = document.createElement("i");
    minusIcon.classList.add("fa-solid", "fa-circle-minus");

    const removeFromWatchlistParagraph = document.createElement("p");
    removeFromWatchlistParagraph.textContent = "Remove From Watchlist";

    secondRowDiv.innerHTML = "";

    secondRowDiv.append(
      movieLength,
      movieGenre,
      minusIcon,
      removeFromWatchlistParagraph
    );

    const movieSummary = document.createElement("p");
    movieSummary.classList.add("movie-summary");
    movieSummary.textContent = data.Plot;

    movieDetailsDiv.appendChild(firstRowDiv);
    movieDetailsDiv.appendChild(secondRowDiv);
    movieDetailsDiv.appendChild(movieSummary);

    movieDiv.appendChild(movieDetailsDiv);
    renderLocation.appendChild(movieDiv);
    renderLocation.append(document.createElement("hr"));

    addEventListenerToMinusIcon(minusIcon, data);
  } else {
    const plusIcon = document.createElement("i");
    plusIcon.classList.add("fa-solid", "fa-circle-plus");
    const addToWatchlistParagraph = document.createElement("p");
    addToWatchlistParagraph.textContent = "Add to Watchlist";

    secondRowDiv.innerHTML = "";
    secondRowDiv.append(
      movieLength,
      movieGenre,
      plusIcon,
      addToWatchlistParagraph
    );

    const movieSummary = document.createElement("p");
    movieSummary.classList.add("movie-summary");
    movieSummary.textContent = data.Plot;

    movieDetailsDiv.appendChild(firstRowDiv);
    movieDetailsDiv.appendChild(secondRowDiv);
    movieDetailsDiv.appendChild(movieSummary);

    movieDiv.appendChild(movieDetailsDiv);

    renderLocation.appendChild(movieDiv);
    renderLocation.append(document.createElement("hr"));

    addEventListenerToPlusIcon(plusIcon, data);
  }
}

function getSearchResults(e) {
  e.preventDefault();
  if (searchBar.value) {
    const movieTitle = searchBar.value;
    const searchUrl = `https://www.omdbapi.com/?apikey=11b33f79&s=${movieTitle}`;

    fetch(searchUrl)
      .then((res) => res.json())
      .then((generalData) => {
        if (generalData.Search.length != 0) {
          movieSearchMainEl.innerHTML = "";
          for (const movie of generalData.Search) {
            const idUrl = `https://www.omdbapi.com/?apikey=11b33f79&t=${movie.Title}`;

            fetch(idUrl)
              .then((res) => res.json())
              .then((data) => {
                renderMovies(data, movieSearchMainEl);
              });
          }
        } else {
          renderLocation.innerHTML = `<h4 class="movie-not-found-text">No results for ${searchBar.value}</h4>`;
        }
      });
  } else {
    alert("Please enter something.");
  }
}

function renderWatchlist() {
  if (myWatchlistEl) {
    if (itemsInWatchlist.length > 0) {
      myWatchlistEl.innerHTML = "";
      itemsInWatchlist.map((item) => {
        fetch(`https://www.omdbapi.com/?apikey=11b33f79&i=${item.imdbID}`)
          .then((res) => res.json())
          .then((detailedData) => {
            renderMovies(detailedData, myWatchlistEl);
          });
      });
    } else {
      myWatchlistEl.innerHTML = "<h4>Add Some Movies to Your Watchlist!</h4>";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("search-btn")) {
    document
      .getElementById("search-btn")
      .addEventListener("click", getSearchResults);
  }

  if (window.location.pathname.includes("watchlist.html")) {
    renderWatchlist();
  }
});