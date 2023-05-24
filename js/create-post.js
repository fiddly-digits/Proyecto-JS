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
