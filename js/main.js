// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob
import { createMainCard, cardHashContainer } from './domCreation.js';
import { getAPost, getPosts, getUsers } from './db-connections.js';
import { isUserLogged, getProfileImage } from './userLogin.js';

let getAccountButtons = document
  .querySelectorAll('.login')
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = './internal/login/login.html';
    };
  });

const addSourceToAnchors = () => {
  let getTitleAnchors = document
    .querySelectorAll('.card-text--article')
    .forEach((title) => {
      title.onclick = function () {
        let postID = this.getAttribute('data-postid');
        location.href = `./internal/post-detail/post-detail.html?id=${postID}`;
      };
    });
};

const cleanList = () => {
  let cardMainList = document.querySelector('.cards-container-main');
  while (cardMainList.firstChild) {
    cardMainList.removeChild(cardMainList.lastChild);
  }
};

const obtainPostComplete = async (post) => {
  let { postTitle, postImg, postDate, userID, hashtags } = post;
  let users = await getUsers();
  for (let key in users) {
    if (userID === key) {
      let { picture, name } = users[key];
      let { first, last } = name;
      let fullName = `${first} ${last}`;
      let postComplete = {
        postTitle,
        postImg,
        postDate,
        picture,
        fullName,
        hashtags
      };
      return postComplete;
    }
  }
};

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

const addCardToDom = async () => {
  let postsInfo = await getPosts();
  for (let post in postsInfo) {
    console.log(
      'Post Complete With Func',
      await obtainPostComplete(postsInfo[post])
    );
    let postComplete = await obtainPostComplete(postsInfo[post]);
    let mainContainer = document.querySelector('.cards-container-main');
    let card = createMainCard(postComplete, post);
    mainContainer.appendChild(card);
    addSourceToAnchors();
  }
};

/*
    const addCardToDom = async () => {
      let postsInfo = await getPosts();
      for (let post in postsInfo) {
        console.log(
          'Post Complete With Func',
          await obtainPostComplete(postsInfo[post])
          );
          let { postTitle, postImg, postDate, userID, hashtags } = postsInfo[post];
          let users = await getUsers();
          for (let key in users) {
            if (userID === key) {
              let { picture, name } = users[key];
              let { first, last } = name;
              let fullName = `${first} ${last}`;
              let postComplete = {
                postTitle,
                postImg,
                postDate,
                picture,
                fullName,
                hashtags
              };
              console.log(postComplete);
              let mainContainer = document.querySelector('.cards-container-main');
              let card = createMainCard(postComplete, post);
              mainContainer.appendChild(card);
              addSourceToAnchors();
            }
          }
        }
      };
      */

const filterSearch = async (searchInput) => {
  let posts = await getPosts();
  let result = [];
  for (let key in posts) {
    let { postTitle, postBody } = posts[key];
    let isTitleCoincident = postTitle
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    let isPostBodyCoincident = postBody
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    isTitleCoincident || isPostBodyCoincident ? result.push(key) : null;
  }
  return result;
};

//Search Bar Logic
let searchBar = document.querySelector('.search-bar__input');
searchBar.addEventListener('keyup', async (event) => {
  event.preventDefault();
  if (event.key == 'Enter') {
    let filteredID = await filterSearch(event.target.value);
    cleanList();
    filteredID.forEach(async (id) => {
      let postComplete = await obtainPostComplete(await getAPost(id));
      let mainContainer = document.querySelector('.cards-container-main');
      let card = createMainCard(postComplete, id);
      mainContainer.appendChild(card);
      let getTitleAnchor = document.querySelector(`[data-postid=${id}]`);
      getTitleAnchor.onclick = function () {
        location.href = `./internal/post-detail/post-detail.html?id=${id}`;
      };
    });
  }
});

// latest.

const filterLatest = async () => {
  let posts = await getPosts();
  let result = [];
  for (let key in posts) {
    let { postDate } = posts[key];
    result.push({ postDate, key });
  }
  return result.sort((a, b) => (a.postDate < b.postDate ? 1 : -1));
};

const latestButton = document.getElementById('latest-filter');
latestButton.addEventListener('click', async (event) => {
  let top = document.getElementById('anchor-filter-top');
  let latest = document.getElementById('anchor-filter-latest');
  let relevant = document.getElementById('anchor-filter-relevant');
  top.classList.remove('fw-bold');
  latest.classList.add('fw-bold');
  relevant.classList.remove('fw-bold');
  let latestObjects = await filterLatest();
  cleanList();
  console.log(latestObjects);
  latestObjects.forEach(async (object) => {
    let postComplete = await obtainPostComplete(await getAPost(object.key));
    let mainContainer = document.querySelector('.cards-container-main');
    let card = createMainCard(postComplete, object.key);
    mainContainer.appendChild(card);
    let getTitleAnchor = document.querySelector(`[data-postid=${object.key}]`);
    getTitleAnchor.onclick = function () {
      location.href = `./internal/post-detail/post-detail.html?id=${object.key}`;
    };
  });
});

// FILTRO TOP
const topButton = document.getElementById('top-filter');
topButton.addEventListener('click', async (event) => {
  let top = document.getElementById('anchor-filter-top');
  let latest = document.getElementById('anchor-filter-latest');
  let relevant = document.getElementById('anchor-filter-relevant');
  top.classList.add('fw-bold');
  latest.classList.remove('fw-bold');
  relevant.classList.remove('fw-bold');
  let posts = await getPosts();
  cleanList();
  for (let key in posts) {
    if (posts[key].isRelevant) {
      let postComplete = await obtainPostComplete(posts[key]);
      let mainContainer = document.querySelector('.cards-container-main');
      console.log(key);
      let card = createMainCard(postComplete, key);
      mainContainer.appendChild(card);
      let getTitleAnchor = document.querySelector(`[data-postid=${key}]`);
      getTitleAnchor.onclick = function () {
        location.href = `./internal/post-detail/post-detail.html?id=${key}`;
      };
    }
  }
});

const relevantButton = document.getElementById('relevant-filter');
relevantButton.addEventListener('click', async (event) => {
  let top = document.getElementById('anchor-filter-top');
  let latest = document.getElementById('anchor-filter-latest');
  let relevant = document.getElementById('anchor-filter-relevant');
  top.classList.remove('fw-bold');
  latest.classList.remove('fw-bold');
  relevant.classList.add('fw-bold');
  cleanList();
  await addCardToDom();
});

const createAsideCard = async (input) => {
  let posts = await getPosts();
  let postsFiltered = 0;
  let postTitleFilter = [];
  for (let key in posts) {
    let { postTitle, hashtags } = posts[key];
    for (let element in hashtags) {
      if (hashtags[element] === input) {
        postsFiltered += 1;
        if (postsFiltered <= 2) {
          postTitleFilter.push(postTitle);
        }
      }
    }
  }
  let card = cardHashContainer(input, postTitleFilter);
  let cardsContainer = document
    .querySelector('.cards-container-right')
    .append(card);
};

isUserLogged();
getProfileImage();
addCardToDom();
createAsideCard('#javascript');
createAsideCard('#kodemia');
