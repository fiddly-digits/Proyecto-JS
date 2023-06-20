import { getAPost, getUser } from './db-connections.js';

export const isUserLogged = () => {
  let token = getUserfromStorage();
  if (token) {
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

export const getUserfromStorage = () => {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  console.log(token);
  if (token) {
    const payload = token.split('.')[1];
    const plainPayload = JSON.parse(atob(payload));
    console.log(plainPayload.id);
    return plainPayload.id;
  }
};

export const getProfileImage = async () => {
  let userID = getUserfromStorage();
  let user = await getUser(userID);
  document.getElementById('profile-picture').setAttribute('src', user.picture);
};

export const isUserOwner = async (id) => {
  const post = await getAPost(id);
  let { postOwner } = post;
  const userLogged = getUserfromStorage();
  console.log('post owner', postOwner);
  console.log('usuario loggeado', userLogged);
  if (postOwner === userLogged) {
    document
      .getElementById('dropdown-logged')
      .classList.remove('visually-hidden');
  }
};

export const logout = () => {
  localStorage.removeItem('token') || sessionStorage.removeItem('token');
};
