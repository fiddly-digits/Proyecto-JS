// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob

let getAccountButtons = document
  .querySelectorAll(".login")
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = "./internal/login/login.html";
    };
  });
