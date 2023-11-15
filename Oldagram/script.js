const posts = [
  {
    name: "Vincent van Gogh",
    username: "vincey1853",
    location: "Zundert, Netherlands",
    avatar: "./images/avatar-vangogh.jpg",
    post: "./images/post-vangogh.jpg",
    comment: "just took a few mushrooms lol",
    likes: 2145,
    isLiked: false,
  },

  {
    name: "Gustave Courbet",
    username: "gus1819",
    location: "Ornans, France",
    avatar: "./images/avatar-courbet.jpg",
    post: "./images/post-courbet.jpg",
    comment: "i'm feelin a bit stressed tbh",
    likes: 4123,
    isLiked: false,
  },

  {
    name: "Joseph Ducreux",
    username: "jd1735",
    location: "Paris, France",
    avatar: "./images/avatar-ducreux.jpg",
    post: "./images/post-ducreux.jpg",
    comment:
      "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
    likes: 1520,
    isLiked: false,
  },

  {
    name: "Élisabeth Louise Vigée Le Brun",
    username: "elv_lebrun",
    location: "Paris, France",
    avatar: "./images/avatar-lebrun.jpeg",
    post: "./images/post-lebrun.jpg",
    comment: "y'all can't touch this lol",
    likes: 10458,
    isLiked: false,
  },
];

const containerEl = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  renderPosts(), addEventListeners();
});

function addEventListeners() {
  const containerEl = document.querySelector(".container");

  const postImages = document.querySelectorAll(".poster-img");
  postImages.forEach((image) => {
    image.addEventListener("dblclick", handleDblClick);
  });

  const heartIcons = document.querySelectorAll(".heart-icon");
  heartIcons.forEach((icon) => {
    icon.addEventListener("click", handleClick);
  });

  containerEl.addEventListener("click", handleContainerClick);
}

function renderPosts() {
  const containerEl = document.querySelector(".container");
  containerEl.innerHTML = ` <header class="logo-avatar-container">
                                <img src="./images/logo.png" alt="Oldagram Logo" class="logo-img" />
                                <img
                                src="./images/user-avatar.png"
                                alt="User Avatar"
                                class="user-avatar-img round-img"
                                />
                            </header>`;

  for (let i = 0; i < posts.length; i++) {
    const currentPoster = posts[i];

    const newPostEl = document.createElement("section");
    newPostEl.classList.add("post");

    const posterInfoContainer = document.createElement("div");
    posterInfoContainer.classList.add("poster-info-container");

    const posterAvatar = document.createElement("img");
    posterAvatar.classList.add("poster-avatar-img", "round-img");
    posterAvatar.setAttribute("src", currentPoster.avatar);

    const posterLocationContainer = document.createElement("div");
    posterLocationContainer.classList.add("poster-location-container");

    const posterNameEl = document.createElement("h2");
    posterNameEl.classList.add("poster-name");
    posterNameEl.textContent = currentPoster.name;

    const posterLocationEl = document.createElement("h3");
    posterLocationEl.classList.add("poster-location");
    posterLocationEl.textContent = currentPoster.location;

    const posterImage = document.createElement("img");
    posterImage.classList.add("poster-img");
    posterImage.setAttribute("src", currentPoster.post);

    const postContentsContainer = document.createElement("div");
    postContentsContainer.classList.add("post-contents-container");

    const iconsContainer = document.createElement("div");
    iconsContainer.classList.add("icons-container");

    const heartIcon = document.createElement("img");
    heartIcon.classList.add("heart-icon");
    heartIcon.setAttribute("src", "./images/icon-heart.png");

    const commentIcon = document.createElement("img");
    commentIcon.classList.add("comment-icon");
    commentIcon.setAttribute("src", "./images/icon-comment.png");

    const dmIcon = document.createElement("img");
    dmIcon.classList.add("dm-icon");
    dmIcon.setAttribute("src", "./images/icon-dm.png");

    const likesEl = document.createElement("h3");
    likesEl.classList.add("likes");
    likesEl.textContent = `${currentPoster.likes} likes`;

    const postContentEl = document.createElement("h3");
    postContentEl.classList.add("post-content");
    postContentEl.innerHTML = `<span class="poster-name">${currentPoster.username}</span><span class="poster-comment">${currentPoster.comment}</span>`;

    newPostEl.append(posterInfoContainer, posterImage, postContentsContainer);
    posterInfoContainer.append(posterAvatar, posterLocationContainer);
    posterLocationContainer.append(posterNameEl, posterLocationEl);
    postContentsContainer.append(iconsContainer, likesEl, postContentEl);
    iconsContainer.append(heartIcon, commentIcon, dmIcon);
    containerEl.append(newPostEl);
  }
  addEventListeners();
}

function handleDblClick(event) {
  const image = event.target;
  const imagePath = image.getAttribute("src");

  for (let i = 0; i < posts.length; i++) {
    let currentItem = posts[i];
    if (currentItem.post === imagePath && !currentItem.isLiked) {
      currentItem.likes += 1;
      currentItem.isLiked = true;
      renderPosts();
    }
  }
}

function handleClick(event) {
  const specificIcon = event.target;
  const correspondingPost = specificIcon.closest(".post");
  const imagePath = correspondingPost
    .querySelector(".poster-img")
    .getAttribute("src");

  for (let i = 0; i < posts.length; i++) {
    let currentItem = posts[i];
    if (currentItem.post === imagePath && !currentItem.isLiked) {
      currentItem.likes += 1;
      currentItem.isLiked = true;
      renderPosts();
    } else if (currentItem.isLiked) {
      currentItem.likes -= 1;
      currentItem.isLiked = false;
      renderPosts();
    }
  }
}

function handleContainerClick(event) {
  if (event.target.classList.contains("heart-icon")) {
    handleLikeIconClick(event);
  }
}
