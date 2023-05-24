//* Esta codigo oculta el form de login

const BASE_URL = `https://dev-clone-c0a56-default-rtdb.firebaseio.com/`;

let registrationForm = document.querySelector(".registration__bottom__form");
registrationForm.classList.add("d-none");

let loginAnchor = document.getElementById("login-anchor");
loginAnchor.onclick = function () {
  registrationForm.classList.remove("d-none");
};

// * Codigo del login

const getUsers = async () => {
  let response = await fetch(`${BASE_URL}users/.json`);
  let data = await response.json();
  return data;
};

const getLoginObject = () => {
  let email = document.getElementById("inputEmail1").value;
  let password = document.getElementById("inputPassword1").value;
  return { email, password };
};

const compareInputsWithDatabase = async () => {
  let userLogged = "";
  let loginTry = getLoginObject();
  let users = await getUsers();
  for (key in users) {
    let { login } = users[key];
    let isEmailValidated = loginTry.email === login.email;
    let isPasswordValidated = loginTry.password === login.password;
    if (isEmailValidated && isPasswordValidated) {
      userLogged = key;
    }
  }
  return userLogged;
};

let loginButton = document.getElementById("submit-btn");
loginButton.addEventListener("click", async (event) => {
  let isLogged = await compareInputsWithDatabase();
  !isLogged
    ? document.getElementById("card-error").classList.remove("d-none")
    : window.open(`/index.html?id=${isLogged}`, "_self");
});
