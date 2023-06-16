import { getUsers } from './db-connections.js';

export const isUserLogged = () => {
  let username = getUserfromStorage();
  if (username) {
    document.getElementById('create-post-btn').classList.remove('d-none');
    document.getElementById('bell-icon').classList.remove('d-none');
    document.getElementById('profile-picture').classList.remove('d-none');
    document
      .getElementById('create-account-btn')
      .classList.add('visually-hidden');
    document.getElementById('log-in-btn').classList.add('visually-hidden');
    document
      .querySelectorAll('.card-registry-container')
      .forEach((cardContainer) => {
        cardContainer.classList.add('visually-hidden');
      });
    document.getElementById('create-post-btn').onclick = function () {
      location.href = './internal/create-post.html/create-post.html';
    };
  }
};

const getUserfromStorage = () => {
  let userNameLocal = localStorage.getItem('userID');
  let userNameSession = sessionStorage.getItem('userID');
  if (userNameLocal) {
    return userNameLocal;
  } else if (userNameSession) {
    return userNameSession;
  }
};

export const getProfileImage = async () => {
  let username = getUserfromStorage();
  let users = await getUsers();
  for (let key in users) {
    let { picture } = users[key];
    if (key === username)
      document.getElementById('profile-picture').setAttribute('src', picture);
  }
};
