import { getAPost, getUser, modifyPost, deletePost } from './db-connections.js';
import {
  isUserLogged,
  getProfileImage,
  isUserOwner,
  logout
} from './userLogin.js';
import { authorData, postData } from './domCreation.js';

let getAccountButtons = document
  .querySelectorAll('.login')
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = '../login/login.html';
    };
  });

let likeAnchor = document.getElementById('like-anchor');
console.log(likeAnchor);

likeAnchor.onclick = async function addLike() {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    let params = new URLSearchParams(window.location.search);
    let paramsID = params.get('id');
    let post = await getAPost(paramsID);
    console.log(post);
    let { likes } = post;
    likes = likes + 1;
    let body = { likes };
    let postUpdated = await modifyPost(body, paramsID);
    console.log(postUpdated);
    var container = document.getElementById('like-counter');
    var content = document.createTextNode(likes); //container.innerHTML;
    container.replaceChildren(content);
  }
};

let bookmarkAnchor = document.getElementById('bookmark-anchor');

bookmarkAnchor.onclick = async function addBook() {
  let token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (token) {
    let params = new URLSearchParams(window.location.search);
    let paramsID = params.get('id');
    let post = await getAPost(paramsID);
    console.log(post);
    let { bookmarks } = post;
    bookmarks = bookmarks + 1;
    let body = { bookmarks };
    let postUpdated = await modifyPost(body, paramsID);
    console.log(postUpdated);
    var container = document.getElementById('bookmark-counter');
    var content = document.createTextNode(bookmarks); //container.innerHTML;
    container.replaceChildren(content);
  }
};

const validateUserOwnership = () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get('id');
  isUserOwner(paramsID);
  let editPostItem = (document.getElementById('post-edit').onclick =
    function () {
      location.href = `../create-post.html/create-post.html?id=${paramsID}`;
    });
};

const validatePostDeletion = () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get('id');
  isUserOwner(paramsID);
  let deletePostItem = (document.getElementById(
    'post-delete-confirmation'
  ).onclick = async function () {
    await deletePost(paramsID);
    location.href = `/index.html`;
  });
};

// * Login user
isUserLogged();
getProfileImage();
validateUserOwnership();
validatePostDeletion();

const dataParser = (date) => {
  const parsedDate = new Date(date);
  const month =
    parsedDate.getMonth() + 1 > 10
      ? `${parsedDate.getMonth() + 1}`
      : `0${parsedDate.getMonth() + 1}`;
  const year = parsedDate.getFullYear();
  const day = parsedDate.getDate();
  return `${day}-${month}-${year}`;
};

const dataToFill = async () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get('id');
  let postObject = await getAPost(paramsID);
  console.log('postObject', postObject);
  let {
    postOwner,
    postDate,
    postTitle,
    hashtags,
    postBody,
    postImg,
    likes,
    bookmarks
  } = postObject;
  let { first, second, third, fourth } = hashtags;
  const parsedPostDate = dataParser(postDate);
  let userObject = await getUser(postOwner);
  console.log(userObject);
  let { picture, name, location, work, joined } = userObject;
  const parsedJoined = dataParser(joined);
  postData(
    name,
    parsedPostDate,
    postTitle,
    postBody,
    hashtags,
    postImg,
    picture,
    likes,
    bookmarks
  );
  authorData(name, location, work, parsedJoined, picture);
};

let signOutAnchor = document.getElementById('sign-out-anchor');

signOutAnchor.onclick = function signOut() {
  logout();
  location.reload();
};

dataToFill();
