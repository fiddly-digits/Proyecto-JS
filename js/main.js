// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob
import { createMainCard, cardHashContainer } from './domCreation.js';
import { getAPost, getPosts, getUsers } from './db-connections.js';
import { isUserLogged, getProfileImage, logout } from './userLogin.js';

let getAccountButtons = document
  .querySelectorAll('.login')
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = './internal/login/login.html';
    };
  });

const addSourceToAnchors = (postID) => {
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
  let { postTitle, postImg, postDate, postOwner, hashtags } = post;
  let users = await getUsers();
  for (let key in users) {
    if (postOwner === users[key]._id) {
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

const addCardToDom = async () => {
  let postsInfo = await getPosts();
  for (let post in postsInfo) {
    console.log(
      'Post Complete With Func',
      await obtainPostComplete(postsInfo[post])
    );
    let postComplete = await obtainPostComplete(postsInfo[post]);
    let mainContainer = document.querySelector('.cards-container-main');
    let card = createMainCard(postComplete, postsInfo[post]._id);
    mainContainer.appendChild(card);
    addSourceToAnchors(postsInfo[post]._id);
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
    console.log(posts[key]);
    let { postTitle, postBody, _id } = posts[key];
    let isTitleCoincident = postTitle
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    let isPostBodyCoincident = postBody
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    isTitleCoincident || isPostBodyCoincident ? result.push(_id) : null;
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
      console.log(id);
      let postComplete = await obtainPostComplete(await getAPost(id));
      let mainContainer = document.querySelector('.cards-container-main');
      let card = createMainCard(postComplete, id);
      mainContainer.appendChild(card);
      addSourceToAnchors(id);
      // let getTitleAnchor = document.querySelector(`[data-postid]`);
      // console.log(getTitleAnchor);
      // getTitleAnchor.onclick = function () {
      //   console.log('index', key);
      //   location.href = `./internal/post-detail/post-detail.html?id=${id}`;
      // };
    });
  }
});

// latest.

const filterLatest = async () => {
  let posts = await getPosts();
  let reversedPosts = await posts.toReversed();
  return reversedPosts;
};

const latestButton = document.getElementById('latest-filter');
latestButton.addEventListener('click', async (event) => {
  let top = document.getElementById('anchor-filter-top');
  let latest = document.getElementById('anchor-filter-latest');
  let relevant = document.getElementById('anchor-filter-relevant');
  top.classList.remove('fw-bold');
  latest.classList.add('fw-bold');
  relevant.classList.remove('fw-bold');
  let posts = await getPosts();
  let reversedPosts = await posts.toReversed();
  console.log(reversedPosts);
  cleanList();
  for (let key in reversedPosts) {
    let postComplete = await obtainPostComplete(reversedPosts[key]);
    let mainContainer = document.querySelector('.cards-container-main');
    let card = createMainCard(postComplete, reversedPosts[key]._id);
    mainContainer.appendChild(card);
    addSourceToAnchors(reversedPosts[key]._id);
  }
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
  let shuffledPosts = await posts.sort((a, b) => 0.5 - Math.random());
  cleanList();
  for (let key in shuffledPosts) {
    if (posts[key].isRelevant) {
      console.log(posts[key].isRelevant);
      let postComplete = await obtainPostComplete(shuffledPosts[key]);
      let mainContainer = document.querySelector('.cards-container-main');
      console.log(posts[key]._id);
      let card = createMainCard(postComplete, shuffledPosts[key]._id);
      mainContainer.appendChild(card);
      addSourceToAnchors(shuffledPosts[key]._id);
      // let getTitleAnchor = document.querySelector(`[data-postid]`);
      // getTitleAnchor.onclick = function () {
      //   console.log('key', posts[key]._id);
      //   window.location.href = `./internal/post-detail/post-detail.html?id=${posts[key]._id}`;
      // };
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

let signOutAnchor = document.getElementById('sign-out-anchor');

signOutAnchor.onclick = function signOut() {
  logout();
  location.reload();
};

isUserLogged();
getProfileImage();
addCardToDom();
createAsideCard('#webdev');
createAsideCard('#frontend');
