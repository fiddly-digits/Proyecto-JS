let getAccountButtons = document
  .querySelectorAll(".login")
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = "../login/login.html";
    };
  });
console.log(document.querySelectorAll(".login"));

// * Login user
const getUserfromStorage = () => {
  let userNameLocal = localStorage.getItem("userID");
  let userNameSession = sessionStorage.getItem("userID");
  if (userNameLocal) {
    return userNameLocal;
  } else if (userNameSession) {
    return userNameSession;
  }
};

const isUserLogged = () => {
  let username = getUserfromStorage();
  if (username) {
    document.getElementById("create-post-btn").classList.remove("d-none");
    document.getElementById("bell-icon").classList.remove("d-none");
    document.getElementById("profile-picture").classList.remove("d-none");
    document
      .getElementById("create-account-btn")
      .classList.add("visually-hidden");
    document.getElementById("log-in-btn").classList.add("visually-hidden");
    document
      .querySelectorAll(".card-registry-container")
      .forEach((cardContainer) => {
        cardContainer.classList.add("visually-hidden");
      });
    document.getElementById("create-post-btn").onclick = function () {
      location.href = "./internal/create-post.html/create-post.html";
    };
  }
};

// ! Este codigo tiene que ser modular
const BASE_URL = `https://dev-clone-c0a56-default-rtdb.firebaseio.com/`;

const getUsers = async () => {
  let response = await fetch(`${BASE_URL}users/.json`);
  let data = await response.json();
  return data;
};

const getProfileImage = async () => {
  let username = getUserfromStorage();
  let users = await getUsers();
  for (key in users) {
    let { picture } = users[key];
    if (key === username)
      document.getElementById("profile-picture").setAttribute("src", picture);
  }
};

isUserLogged();
getProfileImage();

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
  let popover = new bootstrap.Popover(popoverTriggerEl);
  popover._config["html"] = true;
  popover._config["template"] =
    '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div> <script src="./js/main.js"></script>';
  popover._config["content"] =
    '<a type="button" class="btn btn-secondary" onclick="logout(event)">Log out<a>';
  return popover;
});

const POST_ENDPOINT =
  "https://dev-clone-c0a56-default-rtdb.firebaseio.com/posts/";

const getAPost = async (postID) => {
  let response = await fetch(`${POST_ENDPOINT}${postID}/.json`);
  let data = await response.json();
  return data;
};

const getUser = async (user) => {
  let response = await fetch(`${BASE_URL}users/${user}/.json`);
  let data = await response.json();
  return data;
};

const fillPostData = async () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get("id");
  let postObject = await getAPost(paramsID);
  let { userID, postDate, postTitle, hashtags, postBody, postImg } = postObject;
  let { first, second, third, fourth } = hashtags;
  let userObject = await getUser(userID);
  let { picture, name } = userObject;
  let usernameElement = document.getElementById("username");
  let dateElement = document.getElementById("post-date");
  let titleElement = document.getElementById("post-title");
  let creatorPictureElement = document.getElementById("post-user-picture");
  let paragraphElement = document.getElementById("post-content");
  let mainImgElement = document.getElementById("post-main-img");
  let firstHashElement = document.getElementById("first-hash");
  let secondHashElement = document.getElementById("second-hash");
  let thirdHashElement = document.getElementById("third-hash");
  let fourthHashElement = document.getElementById("fourth-hash");
  let publishUsername = document.createTextNode(`${name.first} ${name.last}`);
  let publishDate = document.createTextNode(postDate);
  let publishTitle = document.createTextNode(postTitle);
  let publishBody = document.createTextNode(postBody);
  let publishFirstHash = document.createTextNode(first);
  let publishSecondHash = document.createTextNode(second);
  let publishThirdHash = document.createTextNode(third);
  let publishFourthHash = document.createTextNode(fourth);
  mainImgElement.setAttribute("src", postImg);
  paragraphElement.appendChild(publishBody);
  firstHashElement.appendChild(publishFirstHash);
  secondHashElement.appendChild(publishSecondHash);
  thirdHashElement.appendChild(publishThirdHash);
  fourthHashElement.appendChild(publishFourthHash);
  creatorPictureElement.setAttribute("src", picture);
  usernameElement.appendChild(publishUsername);
  dateElement.appendChild(publishDate);
  titleElement.appendChild(publishTitle);
};

let fillAuthorData = async () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get("id");
  let postObject = await getAPost(paramsID);
  let { userID } = postObject;
  let userObject = await getUser(userID);
  let { picture, name, location, work, joined } = userObject;
  let { first, last } = name;
  let authorNameElement = document.getElementById("author-name");
  console.log(authorNameElement);
  let authorPicElement = document.getElementById("author-pic");
  let authorLocationElement = document.getElementById("author-location");
  let authorWorkElement = document.getElementById("author-work");
  let authorDateElement = document.getElementById("author-date");
  let authorNameText = document.createTextNode(`${first} ${last}`);
  let authorLocationText = document.createTextNode(location);
  let authorWorkText = document.createTextNode(work);
  let authorJoinedText = document.createTextNode(joined);
  authorPicElement.setAttribute("src", picture);
  authorNameElement.appendChild(authorNameText);
  authorLocationElement.appendChild(authorLocationText);
  authorWorkElement.appendChild(authorWorkText);
  authorDateElement.appendChild(authorJoinedText);
};

fillAuthorData();
fillPostData();
