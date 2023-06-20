import { authUser, getUsers } from './db-connections.js';

//* Esta codigo oculta el form de login

let registrationForm = document.querySelector('.registration__bottom__form');
registrationForm.classList.add('d-none');

let loginAnchor = document.getElementById('login-anchor');
loginAnchor.onclick = function () {
  registrationForm.classList.remove('d-none');
};

// * obtiene los valores de los input
const getLoginObject = () => {
  let email = document.getElementById('inputEmail1').value;
  let password = document.getElementById('inputPassword1').value;
  return { email, password };
};

// // * Compara los datos de la base de datos, con los valores de los input
// const compareInputsWithDatabase = async () => {
//   let userLogged = '';
//   let loginTry = getLoginObject();
//   let users = await getUsers();
//   for (let key in users) {
//     let { login } = users[key];
//     let isEmailValidated = loginTry.email === login.email;
//     let isPasswordValidated = loginTry.password === login.password;
//     if (isEmailValidated && isPasswordValidated) {
//       userLogged = key;
//     }
//   }
//   return userLogged;
// };

// * llama el boton y le hace un evento del tipo click, y si la validacion es falsa,
// * arroja un error
let loginButton = document.getElementById('submit-btn');
loginButton.addEventListener('click', async (event) => {
  const loginObj = getLoginObject();
  console.log(loginObj);
  let isAuthenticated = await authUser(loginObj);
  console.log(isAuthenticated.data);

  if (!isAuthenticated?.data) {
    document.getElementById('card-error').classList.remove('d-none');
  } else {
    document.getElementById('check1').checked === true
      ? localStorage.setItem('token', isAuthenticated.data)
      : sessionStorage.setItem('token', isAuthenticated.data);
    window.open(`/index.html`, '_self');
  }
});
