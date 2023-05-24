const BASE_URL = `https://dev-clone-c0a56-default-rtdb.firebaseio.com/`;

const ul = document.querySelector(".hashtags-add");
const input = document.querySelector(".hashtags-add__input");

let maxTags = 4;

let tags = [];

countTags();
createTag();

function countTags() {
  input.focus();
  if (tags.length === 4) {
    input.classList.add("d-none");
  } else {
    input.classList.remove("d-none");
  }
  if (tags.length !== 0) {
    input.placeholder = "Add another...";
  }
}

function createTag() {
  ul.querySelectorAll("li").forEach((li) => li.remove());
  tags.slice().forEach((tag) => {
    input.querySelector(".hashtags-add__input");
    let liTag = createElementTag(tag);
    ul.insertBefore(liTag, input);
  });
  countTags();
}

function createElementTag(tag) {
  let listElement = document.createElement("li");
  listElement.classList.add("d-flex", "align-items-center");
  let icon = document.createElement("i");
  let tagText = document.createTextNode(tag);
  icon.classList.add("iconoir-cancel", "fs-5");
  icon.setAttribute("onclick", `remove(this, '${tag}')`);
  listElement.append(tagText, icon);
  console.log(listElement);
  return listElement;
}

function remove(element, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();
  countTags();
}

input.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    let tag = `#${event.target.value}`;
    if (tag.length > 1 && !tags.includes(tag)) {
      if (tags.length < 4) {
        tags.push(tag);
        createTag();
      }
    }
    event.target.value = "";
  }
});

let titleForm = document.getElementById("FormControlTextarea1");
console.log(titleForm);
titleForm.onclick = function () {
  let cardPost = document
    .getElementById("card-post")
    .classList.remove("invisible");
  let cardTags = document
    .getElementById("card-tagging")
    .classList.add("invisible");
  let editorCard = document
    .getElementById("card-editor")
    .classList.add("invisible");
};

let tagsForm = document.getElementById("FormControlHashtags");
tagsForm.onclick = function () {
  let cardPost = document
    .getElementById("card-post")
    .classList.add("invisible");
  let cardTags = document
    .getElementById("card-tagging")
    .classList.remove("invisible");
  let editorCard = document
    .getElementById("card-editor")
    .classList.add("invisible");
};

let editorForm = document.getElementById("FormControlTextarea2");
console.log(editorForm);
editorForm.onclick = function () {
  let cardPost = document
    .getElementById("card-post")
    .classList.add("invisible");
  let cardTags = document
    .getElementById("card-tagging")
    .classList.add("invisible");
  let editorCard = document
    .getElementById("card-editor")
    .classList.remove("invisible");
};

const textAreaTitle = document.getElementById("FormControlTextarea1");

textAreaTitle.addEventListener("keyup", (event) => {
  let textAreaTitle = document.getElementById("FormControlTextarea1");
  console.log(textAreaTitle.value);
});

const textAreaPost = document.getElementById("FormControlTextarea2");

textAreaPost.addEventListener("keyup", (event) => {
  let textAreaPost = document.getElementById("FormControlTextarea2");
  console.log(textAreaPost.value);
});

let postImageInput = document.getElementById("post-image-input");
console.log(postImageInput.value);

const getHashtagsObject = () => {
  if (tags.length === 4) {
    let first = tags[0];
    let second = tags[1];
    let third = tags[2];
    let fourth = tags[3];
    let hashtags = { first, second, third, fourth };
    return hashtags;
  }
};

let getDate = () => {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  // !reparar neecesita un cero antes del mes si es menor a 10
  return `${day}/${month}/${year}`;
};

let getRandomRelevancy = () => {
  let rand = Math.floor(Math.random() * 2 + 1);
  return rand === 1 ? true : false;
};

const getUserfromStorage = () => {
  let userNameLocal = localStorage.getItem("userID");
  let userNameSession = sessionStorage.getItem("userID");
  if (userNameLocal) {
    return userNameLocal;
  } else if (userNameSession) {
    return userNameSession;
  }
};

const savePost = async () => {
  let post = createPostObject();
  let response = await fetch(`${BASE_URL}posts/.json`, {
    method: "POST",
    body: JSON.stringify(post),
  });
  let data = await response.json();
  return data;
};

const publishButton = document.getElementById("publish-btn");
publishButton.onclick = async function () {
  await savePost();
  window.open("/index.html", "_self");
};

function createPostObject() {
  const textAreaTitle = document.getElementById("FormControlTextarea1");
  const textAreaPost = document.getElementById("FormControlTextarea2");
  const postImageInput = document.getElementById("post-image-input");
  let postTitle = textAreaTitle.value;
  let postBody = textAreaPost.value;
  let postImg = postImageInput.value;
  let userID = getUserfromStorage();
  let isRelevant = getRandomRelevancy();
  let postDate = getDate();
  let hashtags = getHashtagsObject();
  return {
    hashtags,
    isRelevant,
    postBody,
    postDate,
    postImg,
    postTitle,
    userID,
  };
}
