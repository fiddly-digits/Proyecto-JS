//* Esta codigo oculta el form de login

let registrationForm = document.querySelector(".registration__bottom__form");
registrationForm.classList.add("d-none");

let loginAnchor = document.getElementById("login-anchor");
loginAnchor.onclick = function () {
  registrationForm.classList.remove("d-none");
};
