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
