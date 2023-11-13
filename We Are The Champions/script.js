/* Setting up Firebase*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  onValue,
  push,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://we-are-the-champions-78630-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsInDB = sRef(database, "endorsements");

/*    Code   */
const publishBtn = document.getElementById("publish-btn");
const endorsementTextareaEl = document.getElementById(
  "endorsement-textarea-el"
);
const endorsementsContainerEl = document.querySelector(
  ".endorsements-container-el"
);
const fromTextareaEl = document.getElementById("from-textarea-el");
const toTextareaEl = document.getElementById("to-textarea-el");

publishBtn.addEventListener("click", function () {
  let endorsementText = endorsementTextareaEl.value;
  let fromPerson = fromTextareaEl.value;
  let toPerson = toTextareaEl.value;

  if (endorsementText && fromPerson && toPerson) {
    let endorsementDetails = {
      sender: fromTextareaEl.value,
      receiver: toTextareaEl.value,
      message: endorsementText,
      likes: 0,
    };
    push(endorsementsInDB, endorsementDetails);
    clearTextareaEl();
  } else {
    alert("Please do not leave any blanks!");
    return;
  }
});

addEventListenersToLikeButtons();

onValue(endorsementsInDB, function (snapshot) {
  if (snapshot.exists()) {
    let endorsementsArray = Object.entries(snapshot.val());
    clearEndorsementsContainerEl();
    for (let i = 0; i < endorsementsArray.length; i++) {
      let endorsementID = endorsementsArray[i][0];
      let endorsement = endorsementsArray[i][1];
      let sender = endorsement.sender;
      let receiver = endorsement.receiver;
      let message = endorsement.message;
      let likes = endorsement.likes;
      appendEndorsement(sender, receiver, message, likes, endorsementID);
    }
    addEventListenersToLikeButtons();
  } else {
    endorsementsContainerEl.innerHTML = "Endorsements will show up here";
    endorsementsContainerEl.style.color = "white";
  }
});

function appendEndorsement(sender, receiver, message, likes, endorsementID) {
  let newEndorsement = document.createElement("div");
  newEndorsement.classList.add("endorsement");

  newEndorsement.style.color = "black";
  newEndorsement.innerHTML = `<b>To ${receiver}</b><p>${message}</p><b><div class="from-container"><span class="from-text">From ${sender}</span></b><span class="likes"><i class="like-btn fa-solid fa-heart fa-lg" data-endorsement-id="${endorsementID}"></i><h4 class="number-of-likes">${likes}</h4></span></div>`;
  endorsementsContainerEl.append(newEndorsement);
}

function addEventListenersToLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach((button) => {
    button.addEventListener("click", handleLikeButtonClick);
  });
}

function handleLikeButtonClick(event) {
  const button = event.target;
  const endorsementID = button.getAttribute("data-endorsement-id");
  const endorsement = getEndorsementById(endorsementID);
  button.removeEventListener("click", handleLikeButtonClick);
  if (endorsement) {
    updateLikes(endorsementID);
  }
}

function getEndorsementById(endorsementID) {
  const endorsements = endorsementsContainerEl.childNodes;
  for (let i = 0; i < endorsements.length; i++) {
    const endorsement = endorsements[i];
    if (
      endorsement
        .querySelector(".like-btn")
        .getAttribute("data-endorsement-id") === endorsementID
    ) {
      return endorsement;
    }
  }
  return null;
}

function updateLikes(endorsementID) {
  const likesRef = sRef(database, `endorsements/${endorsementID}/likes`);
  get(likesRef)
    .then((snapshot) => {
      let currentLikes = snapshot.val() || 0;
      set(likesRef, currentLikes + 1);
    })
    .catch((e) => {
      console.log(e);
    });
}

function clearTextareaEl() {
  endorsementTextareaEl.value = "";
  fromTextareaEl.value = "";
  toTextareaEl.value = "";
}

function clearEndorsementsContainerEl() {
  endorsementsContainerEl.innerHTML = "";
}
