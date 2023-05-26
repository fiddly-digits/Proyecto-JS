// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob
//import { BASE_URL, getUsers } from "./login.js";

let getAccountButtons = document
  .querySelectorAll(".login")
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = "./internal/login/login.html";
    };
  });

const addSourceToAnchors = () => {
  let getTitleAnchors = document
    .querySelectorAll(".card-text--article")
    .forEach((title) => {
      title.onclick = function () {
        let postID = this.getAttribute("data-postid");
        location.href = `./internal/post-detail/post-detail.html?id=${postID}`;
      };
    });
};

console.log(document.querySelectorAll(".card-text--article"));

// * Login user
const getUserfromStorage = () => {
  let userNameLocal = localStorage.getItem("userID");
  let userNameSession = sessionStorage.getItem("userID");
  if (userNameLocal) {
    return userNameLocal;
  } else if (userNameSession) {
    return userNameSession;
  }
};

const isUserLogged = () => {
  let username = getUserfromStorage();
  if (username) {
    document.getElementById("create-post-btn").classList.remove("d-none");
    document.getElementById("bell-icon").classList.remove("d-none");
    document.getElementById("profile-picture").classList.remove("d-none");
    document
      .getElementById("create-account-btn")
      .classList.add("visually-hidden");
    document.getElementById("log-in-btn").classList.add("visually-hidden");
    document
      .querySelectorAll(".card-registry-container")
      .forEach((cardContainer) => {
        cardContainer.classList.add("visually-hidden");
      });
    document.getElementById("create-post-btn").onclick = function () {
      location.href = "./internal/create-post.html/create-post.html";
    };
  }
};

// ! Este codigo tiene que ser modular
const BASE_URL = `https://dev-clone-c0a56-default-rtdb.firebaseio.com/`;

const getUsers = async () => {
  let response = await fetch(`${BASE_URL}users/.json`);
  let data = await response.json();
  return data;
};

const getProfileImage = async () => {
  let username = getUserfromStorage();
  let users = await getUsers();
  for (key in users) {
    let { picture } = users[key];
    if (key === username)
      document.getElementById("profile-picture").setAttribute("src", picture);
  }
};

isUserLogged();
getProfileImage();

const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map((popoverTriggerEl) => {
  let popover = new bootstrap.Popover(popoverTriggerEl);
  popover._config["html"] = true;
  popover._config["template"] =
    '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div> <script src="./js/main.js"></script>';
  popover._config["content"] =
    '<a type="button" class="btn btn-secondary" onclick="logout(event)">Log out<a>';
  return popover;
});

// ! DOM Creation
//CREANDO BOOKMARK listo
const createBookmarkComponent = () => {
  let wrapper = document.createElement("div");
  let text = document.createElement("p");
  let anchor = document.createElement("a");
  let icon = document.createElement("i");
  let textNode = document.createTextNode("4 min read");
  wrapper.classList.add(
    "bookmark",
    "d-flex",
    "gap-2",
    "justify-content-center"
  );
  text.classList.add("bookmark__item");
  icon.classList.add("iconoir-bookmark-empty", "icons-style-sm");
  text.appendChild(textNode);
  anchor.setAttribute("href", "#");
  anchor.appendChild(icon);
  wrapper.append(text, anchor);
  return wrapper;
};

//CREANDO INTERACCIONES LISTO
const createInteractionsComponent = () => {
  let bookmarkComponent = createBookmarkComponent();
  let wrapperInteractions = document.createElement("div");
  let reactions = document.createElement("div");
  let textReactions = document.createElement("a");
  let iconAnchor = document.createElement("a");
  let iconComment = document.createElement("i");
  let textNode = document.createTextNode("9 Reactions");
  let addCommentText = document.createTextNode("Add Comment");
  wrapperInteractions.classList.add(
    "interactions",
    "d-flex",
    "flex-wrap",
    "justify-content-between"
  );
  reactions.classList.add("reactions", "d-flex", "gap-3");
  textReactions.classList.add("reactions__item");
  iconAnchor.classList.add("reactions__item");
  iconComment.classList.add(
    "iconoir-chat-bubble-empty",
    "reactions__item__bubble"
  );
  iconAnchor.append(iconComment, addCommentText);
  textReactions.appendChild(textNode);
  reactions.append(textReactions, iconAnchor);
  wrapperInteractions.append(reactions, bookmarkComponent);
  return wrapperInteractions;
};

//CREANDO HASHTAGS listo

const createHashtagComponent = (first, second, third, fourth) => {
  let wrapperHashtags = document.createElement("div");
  let elementHashtag1 = document.createElement("a");
  let TextHashtag1 = document.createTextNode(first); //DINAMICO
  let elementHashtag2 = document.createElement("a");
  let TextHashtag2 = document.createTextNode(second); //DINAMICO
  let elementHashtag3 = document.createElement("a");
  let TextHashtag3 = document.createTextNode(third); //DINAMICO
  let elementHashtag4 = document.createElement("a");
  let TextHashtag4 = document.createTextNode(fourth); //DINAMICO
  wrapperHashtags.classList.add(
    "hashtags",
    "d-flex",
    "flex-wrap",
    "gap-4",
    "mb-3"
  );
  elementHashtag1.classList.add("hashtags__item");
  elementHashtag2.classList.add("hashtags__item");
  elementHashtag3.classList.add("hashtags__item");
  elementHashtag4.classList.add("hashtags__item");
  elementHashtag1.appendChild(TextHashtag1);
  elementHashtag2.appendChild(TextHashtag2);
  elementHashtag3.appendChild(TextHashtag3);
  elementHashtag4.appendChild(TextHashtag4);
  wrapperHashtags.append(
    elementHashtag1,
    elementHashtag2,
    elementHashtag3,
    elementHashtag4
  );
  return wrapperHashtags;
};

//CREANDO TEXTO LISTO

const createText = (postTitle, postID) => {
  let wrapperAnchor = document.createElement("a");
  let wrapperTextArticle = document.createElement("h3");
  let textArticle = document.createTextNode(postTitle); //Cambiar Despues
  wrapperAnchor.classList.add("card-text", "card-text--article", "mb-2");
  wrapperAnchor.setAttribute("data-postID", postID);
  wrapperTextArticle.append(textArticle);
  wrapperAnchor.appendChild(wrapperTextArticle);
  return wrapperAnchor;
};

//CREANDO SUBTITULO LISTO

const createSubtitle = (postDate) => {
  let textSubtitleContainer = document.createElement("p");
  let dateSubtitle = document.createElement("span");
  let texSubtitle = document.createTextNode(postDate); //DINAMICO
  textSubtitleContainer.classList.add("card-subtitle");
  dateSubtitle.classList.add("card-subtitle--date");
  dateSubtitle.appendChild(texSubtitle);
  textSubtitleContainer.append(dateSubtitle);
  return textSubtitleContainer;
};

//CREANDO TITULO listo

const createTitle = (fullName) => {
  let titleContainer = document.createElement("p");
  let title = document.createElement("span");
  let textTitle = document.createTextNode(fullName); //DINAMICO
  titleContainer.classList.add("card-title");
  title.classList.add("card-title--user");
  title.appendChild(textTitle);
  titleContainer.append(title);
  return titleContainer;
};

//CREANDO CONTAINER SECUNDARIO
const createSecondaryContainer = (
  postTitle,
  postDate,
  fullName,
  first,
  second,
  third,
  fourth,
  postID
) => {
  let interactionsComponent = createInteractionsComponent();
  let hashtagsComponent = createHashtagComponent(first, second, third, fourth);
  let textComponent = createText(postTitle, postID);
  let subtitleComponent = createSubtitle(postDate);
  let titleComponent = createTitle(fullName);
  let secondaryContainer = document.createElement("div");
  secondaryContainer.classList.add("d-flex", "flex-column", "ps-2");
  secondaryContainer.append(
    titleComponent,
    subtitleComponent,
    textComponent,
    hashtagsComponent,
    interactionsComponent
  );
  return secondaryContainer;
};

//CREANDO IMAGEN USUARIO

const createUserImage = (picture) => {
  let anchor = document.createElement("a");
  let userImage = document.createElement("img");
  userImage.setAttribute("src", picture); //DINAMICO
  userImage.setAttribute("alt", "user");
  userImage.setAttribute("width", "35");
  userImage.setAttribute("height", "35");
  userImage.classList.add("circle-profile-picture--nohover");
  anchor.appendChild(userImage);
  return anchor;
};

//CREANDO CARD BODY
const createCardBody = (
  postTitle,
  picture,
  postDate,
  fullName,
  first,
  second,
  third,
  fourth,
  postID
) => {
  let componentUserImage = createUserImage(picture);
  let componentSecondary = createSecondaryContainer(
    postTitle,
    postDate,
    fullName,
    first,
    second,
    third,
    fourth,
    postID
  );
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex");
  cardBody.append(componentUserImage, componentSecondary);
  return cardBody;
};

//CREANDO IMAGEN PRINCIPAL
const createMainImage = (postImg) => {
  let mainImage = document.createElement("img");
  mainImage.classList.add("card-img-top");
  mainImage.setAttribute("src", postImg);
  mainImage.setAttribute("alt", "...");
  return mainImage;
};

// CREANDO DIV CONTAINER
const createMainCard = (info, postID) => {
  let { postTitle, postImg, postDate, picture, fullName, hashtags } = info;
  let { first, second, third, fourth } = hashtags;
  let card = document.createElement("div");
  let topImage = createMainImage(postImg);
  let cardBody = createCardBody(
    postTitle,
    picture,
    postDate,
    fullName,
    first,
    second,
    third,
    fourth,
    postID
  );
  card.classList.add("card");
  card.setAttribute("data-card-id", postID);
  card.append(topImage, cardBody);
  return card;
};

const addCardToDom = async () => {
  let postsInfo = await getPosts();
  for (post in postsInfo) {
    let { postTitle, postImg, postDate, userID, hashtags } = postsInfo[post];
    let users = await getUsers();
    for (key in users) {
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
          hashtags,
        };
        console.log(postComplete);
        let mainContainer = document.querySelector(".cards-container-main");
        let card = createMainCard(postComplete, post);
        mainContainer.appendChild(card);
        addSourceToAnchors();
      }
    }
  }
  //let {postDate, postImg, postTitle} = postInfo
};

// ! List
const createHashList = (postTitle) => {
  let ulList = document.createElement("ul");
  let liElement = document.createElement("li");
  let parrText1 = document.createElement("p");
  let textOfParr1 = document.createTextNode(postTitle[0]); //DINAMICO
  let parrText2 = document.createElement("p");
  let textOfParr2 = document.createTextNode("7 comments"); //DINAMICO
  ulList.classList.add("list-group", "list-group-flush");
  liElement.classList.add("list-group-item");
  parrText1.classList.add("card-title", "list-group-item--title");
  parrText2.classList.add(
    "card-subtitle",
    "text-muted",
    "list-group-item--subtitle"
  );
  parrText1.appendChild(textOfParr1);
  parrText2.appendChild(textOfParr2);
  liElement.append(parrText1, parrText2);
  let liElement2 = document.createElement("li");
  let parrText3 = document.createElement("p");
  let textOfParr3 = document.createTextNode(postTitle[1]); //DINAMICO
  let parrText4 = document.createElement("p");
  let textOfParr4 = document.createTextNode("7 comments"); //DINAMICO
  liElement2.classList.add("list-group-item");
  parrText3.classList.add("card-title", "list-group-item--title");
  parrText4.classList.add(
    "card-subtitle",
    "text-muted",
    "list-group-item--subtitle"
  );
  parrText3.appendChild(textOfParr3);
  parrText4.appendChild(textOfParr4);
  liElement2.append(parrText3, parrText4);
  ulList.append(liElement, liElement2);
  return ulList;
};

//CREANDO TITULO DISCUSS
const cardHashTitle = (title) => {
  let divTitle = document.createElement("div");
  let parrTitle = document.createElement("p");
  let articleTitle = document.createElement("a");
  let boldTitle = document.createElement("b");
  let textTitle = document.createTextNode(title); //DINAMICO
  divTitle.classList.add(
    "card-header",
    "d-flex",
    "justify-content-between",
    "bg-white",
    "align-items-center"
  );
  parrTitle.classList.add("card-title", "fs-5", "mb-0");
  articleTitle.classList.add("card-title__hash");
  articleTitle.setAttribute("href", "#");
  boldTitle.appendChild(textTitle);
  articleTitle.appendChild(boldTitle);
  parrTitle.appendChild(articleTitle);
  divTitle.appendChild(parrTitle);
  return divTitle;
};

const cardHashContainer = (hashTitle, postTitle) => {
  let divContainer = document.createElement("div");
  let divSecondary = document.createElement("div");
  divContainer.classList.add(
    "cards-container-right",
    "d-flex",
    "flex-column",
    "gap-4"
  );
  divSecondary.classList.add("card");
  let list = createHashList(postTitle);
  let title = cardHashTitle(hashTitle);
  divSecondary.append(title, list);
  divContainer.append(divSecondary);
  return divContainer;
};
//TRAER OBJETOS DE BASE DATOS EN MAIN
const POST_ENDPOINT =
  "https://dev-clone-c0a56-default-rtdb.firebaseio.com/posts/.json";

const getPosts = async () => {
  let response = await fetch(POST_ENDPOINT);
  let data = await response.json();
  return data;
};

addCardToDom();

const filterSearch = async (searchInput) => {
  let posts = await getPosts();
  let result = [];
  for (key in posts) {
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
const SINGLE_POST_ENDPOINT =
  "https://dev-clone-c0a56-default-rtdb.firebaseio.com/posts/";

let searchBar = document.querySelector(".search-bar__input");
searchBar.addEventListener("keyup", async (event) => {
  event.preventDefault();
  if (event.key == "Enter") {
    let filteredID = await filterSearch(event.target.value);
    cleanList();
    filteredID.forEach(async (id) => {
      let postInfo = await getAPost(id);
      console.log(id);
      let { postTitle, postImg, postDate, userID, hashtags } = postInfo;
      let users = await getUsers();
      for (key in users) {
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
            hashtags,
          };
          console.log(postComplete);
          let mainContainer = document.querySelector(".cards-container-main");
          let card = createMainCard(postComplete, id);
          mainContainer.appendChild(card);
          let getTitleAnchor = document.querySelector(`[data-postid=${id}]`);
          getTitleAnchor.onclick = function () {
            location.href = `./internal/post-detail/post-detail.html?id=${id}`;
          };
        }
      }
    });
  }
});

const getAPost = async (postID) => {
  let response = await fetch(`${SINGLE_POST_ENDPOINT}${postID}/.json`);
  let data = await response.json();
  return data;
};

const cleanList = () => {
  let cardMainList = document.querySelector(".cards-container-main");
  while (cardMainList.firstChild) {
    cardMainList.removeChild(cardMainList.lastChild);
  }
};

const filterLatest = async () => {
  let posts = await getPosts();
  let result = [];
  for (key in posts) {
    let { postDate } = posts[key];
    result.push({ postDate, key });
  }
  return result.sort((a, b) => (a.postDate < b.postDate ? 1 : -1));
};
// latest.
const latestButton = document.getElementById("latest-filter");
latestButton.addEventListener("click", async (event) => {
  let top = document.getElementById("anchor-filter-top");
  let latest = document.getElementById("anchor-filter-latest");
  let relevant = document.getElementById("anchor-filter-relevant");
  top.classList.remove("fw-bold");
  latest.classList.add("fw-bold");
  relevant.classList.remove("fw-bold");
  let latestObjects = await filterLatest();
  cleanList();
  console.log(latestObjects);
  latestObjects.forEach(async (object) => {
    let post = await getAPost(object.key);
    let { postTitle, postImg, postDate, userID, hashtags } = post;
    let users = await getUsers();
    for (key in users) {
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
          hashtags,
        };
        console.log(postComplete);
        let mainContainer = document.querySelector(".cards-container-main");
        let card = createMainCard(postComplete, object.key);
        mainContainer.appendChild(card);
        let getTitleAnchor = document.querySelector(
          `[data-postid=${object.key}]`
        );
        getTitleAnchor.onclick = function () {
          location.href = `./internal/post-detail/post-detail.html?id=${object.key}`;
        };
      }
    }
  });
});
// FILTRO TOP
const topButton = document.getElementById("top-filter");
topButton.addEventListener("click", async (event) => {
  let top = document.getElementById("anchor-filter-top");
  let latest = document.getElementById("anchor-filter-latest");
  let relevant = document.getElementById("anchor-filter-relevant");
  top.classList.add("fw-bold");
  latest.classList.remove("fw-bold");
  relevant.classList.remove("fw-bold");
  let posts = await getPosts();
  cleanList();
  for (key in posts) {
    if (posts[key].isRelevant) {
      let { postTitle, postImg, postDate, userID, hashtags } = posts[key];
      let users = await getUsers();
      for (key in users) {
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
            hashtags,
          };
          console.log(postComplete);
          let mainContainer = document.querySelector(".cards-container-main");
          let card = createMainCard(postComplete, key);
          mainContainer.appendChild(card);
          let getTitleAnchor = document.querySelector(`[data-postid=${key}]`);
          getTitleAnchor.onclick = function () {
            location.href = `./internal/post-detail/post-detail.html?id=${key}`;
          };
        }
      }
    }
  }
});

const relevantButton = document.getElementById("relevant-filter");
relevantButton.addEventListener("click", async (event) => {
  let top = document.getElementById("anchor-filter-top");
  let latest = document.getElementById("anchor-filter-latest");
  let relevant = document.getElementById("anchor-filter-relevant");
  top.classList.remove("fw-bold");
  latest.classList.remove("fw-bold");
  relevant.classList.add("fw-bold");
  cleanList();
  await addCardToDom();
});

const createAsideCard = async (input) => {
  let posts = await getPosts();
  let postsFiltered = 0;
  let postTitleFilter = [];
  for (key in posts) {
    let { postTitle, hashtags } = posts[key];
    for (element in hashtags) {
      if (hashtags[element] === input) {
        postsFiltered += 1;
        if (postsFiltered <= 2) {
          postTitleFilter.push(postTitle);
        }
      }
    }
  }
  console.log(postTitleFilter);
  let card = cardHashContainer(input, postTitleFilter);
  let cardsContainer = document
    .querySelector(".cards-container-right")
    .append(card);
};

createAsideCard("#javascript");
createAsideCard("#kodemia");
