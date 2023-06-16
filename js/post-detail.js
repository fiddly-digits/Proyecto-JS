import { getAPost, getUser } from './db-connections.js';
import { isUserLogged, getProfileImage } from './userLogin.js';
import { authorData, postData } from './domCreation.js';

let getAccountButtons = document
  .querySelectorAll('.login')
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = '../login/login.html';
    };
  });

// * Login user
isUserLogged();
getProfileImage();

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
  let popover = new bootstrap.Popover(popoverTriggerEl);
  popover._config['html'] = true;
  popover._config['template'] =
    '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div> <script src="./js/main.js"></script>';
  popover._config['content'] =
    '<a type="button" class="btn btn-secondary" onclick="logout(event)">Log out<a>';
  return popover;
});

const dataToFill = async () => {
  let params = new URLSearchParams(window.location.search);
  let paramsID = params.get('id');
  let postObject = await getAPost(paramsID);
  let { userID, postDate, postTitle, hashtags, postBody, postImg } = postObject;
  let { first, second, third, fourth } = hashtags;
  let userObject = await getUser(userID);
  let { picture, name, location, work, joined } = userObject;
  postData(name, postDate, postTitle, postBody, hashtags, postImg, picture);
  authorData(name, location, work, joined, picture);
};

dataToFill();
