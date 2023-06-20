// ! DOM Creation
//CREANDO BOOKMARK listo
const createBookmarkComponent = () => {
  let wrapper = document.createElement('div');
  let text = document.createElement('p');
  let anchor = document.createElement('a');
  let icon = document.createElement('i');
  let textNode = document.createTextNode('4 min read');
  wrapper.classList.add(
    'bookmark',
    'd-flex',
    'gap-2',
    'justify-content-center'
  );
  text.classList.add('bookmark__item');
  icon.classList.add('iconoir-bookmark-empty', 'icons-style-sm');
  text.appendChild(textNode);
  anchor.setAttribute('href', '#');
  anchor.appendChild(icon);
  wrapper.append(text, anchor);
  return wrapper;
};

//CREANDO INTERACCIONES LISTO
const createInteractionsComponent = () => {
  let bookmarkComponent = createBookmarkComponent();
  let wrapperInteractions = document.createElement('div');
  let reactions = document.createElement('div');
  let textReactions = document.createElement('a');
  let iconAnchor = document.createElement('a');
  let iconComment = document.createElement('i');
  let textNode = document.createTextNode('9 Reactions');
  let addCommentText = document.createTextNode('Add Comment');
  wrapperInteractions.classList.add(
    'interactions',
    'd-flex',
    'flex-wrap',
    'justify-content-between'
  );
  reactions.classList.add('reactions', 'd-flex', 'gap-3');
  textReactions.classList.add('reactions__item');
  iconAnchor.classList.add('reactions__item');
  iconComment.classList.add(
    'iconoir-chat-bubble-empty',
    'reactions__item__bubble'
  );
  iconAnchor.append(iconComment, addCommentText);
  textReactions.appendChild(textNode);
  reactions.append(textReactions, iconAnchor);
  wrapperInteractions.append(reactions, bookmarkComponent);
  return wrapperInteractions;
};

//CREANDO HASHTAGS listo

const createHashtagComponent = (first, second, third, fourth) => {
  let wrapperHashtags = document.createElement('div');
  let elementHashtag1 = document.createElement('a');
  let TextHashtag1 = document.createTextNode(first); //DINAMICO
  let elementHashtag2 = document.createElement('a');
  let TextHashtag2 = document.createTextNode(second); //DINAMICO
  let elementHashtag3 = document.createElement('a');
  let TextHashtag3 = document.createTextNode(third); //DINAMICO
  let elementHashtag4 = document.createElement('a');
  let TextHashtag4 = document.createTextNode(fourth); //DINAMICO
  wrapperHashtags.classList.add(
    'hashtags',
    'd-flex',
    'flex-wrap',
    'gap-4',
    'mb-3'
  );
  elementHashtag1.classList.add('hashtags__item');
  elementHashtag2.classList.add('hashtags__item');
  elementHashtag3.classList.add('hashtags__item');
  elementHashtag4.classList.add('hashtags__item');
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
  let wrapperAnchor = document.createElement('a');
  let wrapperTextArticle = document.createElement('h3');
  let textArticle = document.createTextNode(postTitle); //Cambiar Despues
  wrapperAnchor.classList.add('card-text', 'card-text--article', 'mb-2');
  wrapperAnchor.setAttribute('data-postID', postID);
  wrapperTextArticle.append(textArticle);
  wrapperAnchor.appendChild(wrapperTextArticle);
  return wrapperAnchor;
};

//CREANDO SUBTITULO LISTO

const createSubtitle = (postDate) => {
  const parsedDate = new Date(postDate);
  const month =
    parsedDate.getMonth() + 1 > 10
      ? `${parsedDate.getMonth() + 1}`
      : `0${parsedDate.getMonth() + 1}`;
  const year = parsedDate.getFullYear();
  const day = parsedDate.getDate();
  let textSubtitleContainer = document.createElement('p');
  let dateSubtitle = document.createElement('span');
  let texSubtitle = document.createTextNode(`${day}-${month}-${year}`); //DINAMICO
  textSubtitleContainer.classList.add('card-subtitle');
  dateSubtitle.classList.add('card-subtitle--date');
  dateSubtitle.appendChild(texSubtitle);
  textSubtitleContainer.append(dateSubtitle);
  return textSubtitleContainer;
};

//CREANDO TITULO listo

const createTitle = (fullName) => {
  let titleContainer = document.createElement('p');
  let title = document.createElement('span');
  let textTitle = document.createTextNode(fullName); //DINAMICO
  titleContainer.classList.add('card-title');
  title.classList.add('card-title--user');
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
  let secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('d-flex', 'flex-column', 'ps-2');
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
  let anchor = document.createElement('a');
  let userImage = document.createElement('img');
  userImage.setAttribute('src', picture); //DINAMICO
  userImage.setAttribute('alt', 'user');
  userImage.setAttribute('width', '35');
  userImage.setAttribute('height', '35');
  userImage.classList.add('circle-profile-picture--nohover');
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
  let cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'd-flex');
  cardBody.append(componentUserImage, componentSecondary);
  return cardBody;
};

//CREANDO IMAGEN PRINCIPAL
const createMainImage = (postImg) => {
  let mainImage = document.createElement('img');
  mainImage.classList.add('card-img-top');
  mainImage.setAttribute('src', postImg);
  mainImage.setAttribute('alt', '...');
  return mainImage;
};

// CREANDO DIV CONTAINER
export let createMainCard = (info, postID) => {
  let { postTitle, postImg, postDate, picture, fullName, hashtags } = info;
  let { first, second, third, fourth } = hashtags;
  let card = document.createElement('div');
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
  card.classList.add('card');
  card.setAttribute('data-card-id', postID);
  card.append(topImage, cardBody);
  return card;
};

// ! List
const createHashList = (postTitle) => {
  let ulList = document.createElement('ul');
  let liElement = document.createElement('li');
  let parrText1 = document.createElement('p');
  let textOfParr1 = document.createTextNode(postTitle[0]); //DINAMICO
  let parrText2 = document.createElement('p');
  let textOfParr2 = document.createTextNode('7 comments'); //DINAMICO
  ulList.classList.add('list-group', 'list-group-flush');
  liElement.classList.add('list-group-item');
  parrText1.classList.add('card-title', 'list-group-item--title');
  parrText2.classList.add(
    'card-subtitle',
    'text-muted',
    'list-group-item--subtitle'
  );
  parrText1.appendChild(textOfParr1);
  parrText2.appendChild(textOfParr2);
  liElement.append(parrText1, parrText2);
  let liElement2 = document.createElement('li');
  let parrText3 = document.createElement('p');
  let textOfParr3 = document.createTextNode(postTitle[1]); //DINAMICO
  let parrText4 = document.createElement('p');
  let textOfParr4 = document.createTextNode('7 comments'); //DINAMICO
  liElement2.classList.add('list-group-item');
  parrText3.classList.add('card-title', 'list-group-item--title');
  parrText4.classList.add(
    'card-subtitle',
    'text-muted',
    'list-group-item--subtitle'
  );
  parrText3.appendChild(textOfParr3);
  parrText4.appendChild(textOfParr4);
  liElement2.append(parrText3, parrText4);
  ulList.append(liElement, liElement2);
  return ulList;
};

//CREANDO TITULO DISCUSS
const cardHashTitle = (title) => {
  let divTitle = document.createElement('div');
  let parrTitle = document.createElement('p');
  let articleTitle = document.createElement('a');
  let boldTitle = document.createElement('b');
  let textTitle = document.createTextNode(title); //DINAMICO
  divTitle.classList.add(
    'card-header',
    'd-flex',
    'justify-content-between',
    'bg-white',
    'align-items-center'
  );
  parrTitle.classList.add('card-title', 'fs-5', 'mb-0');
  articleTitle.classList.add('card-title__hash');
  articleTitle.setAttribute('href', '#');
  boldTitle.appendChild(textTitle);
  articleTitle.appendChild(boldTitle);
  parrTitle.appendChild(articleTitle);
  divTitle.appendChild(parrTitle);
  return divTitle;
};

export const cardHashContainer = (hashTitle, postTitle) => {
  let divContainer = document.createElement('div');
  let divSecondary = document.createElement('div');
  divContainer.classList.add(
    'cards-container-right',
    'd-flex',
    'flex-column',
    'gap-4'
  );
  divSecondary.classList.add('card');
  let list = createHashList(postTitle);
  let title = cardHashTitle(hashTitle);
  divSecondary.append(title, list);
  divContainer.append(divSecondary);
  return divContainer;
};

export const postData = (
  name,
  postDate,
  postTitle,
  postBody,
  hashtags,
  postImg,
  userPicture,
  likes,
  bookmarks
) => {
  console.log(likes);
  let usernameElement = document.getElementById('username');
  let dateElement = document.getElementById('post-date');
  let titleElement = document.getElementById('post-title');
  let creatorPictureElement = document.getElementById('post-user-picture');
  let paragraphElement = document.getElementById('post-content');
  let mainImgElement = document.getElementById('post-main-img');
  let firstHashElement = document.getElementById('first-hash');
  let secondHashElement = document.getElementById('second-hash');
  let thirdHashElement = document.getElementById('third-hash');
  let fourthHashElement = document.getElementById('fourth-hash');
  let likesElement = document.getElementById('like-counter');
  let bookmarkElement = document.getElementById('bookmark-counter');
  let publishUsername = document.createTextNode(`${name.first} ${name.last}`);
  let publishDate = document.createTextNode(postDate);
  let publishTitle = document.createTextNode(postTitle);
  let publishBody = document.createTextNode(postBody);
  let publishFirstHash = document.createTextNode(hashtags.first);
  let publishSecondHash = document.createTextNode(hashtags.second);
  let publishThirdHash = document.createTextNode(hashtags.third);
  let publishFourthHash = document.createTextNode(hashtags.fourth);
  let publishLikes = document.createTextNode(likes);
  let publishBookmarks = document.createTextNode(bookmarks);
  mainImgElement.setAttribute('src', postImg);
  paragraphElement.appendChild(publishBody);
  firstHashElement.appendChild(publishFirstHash);
  secondHashElement.appendChild(publishSecondHash);
  thirdHashElement.appendChild(publishThirdHash);
  likesElement.appendChild(publishLikes);
  bookmarkElement.appendChild(publishBookmarks);
  fourthHashElement.appendChild(publishFourthHash);
  creatorPictureElement.setAttribute('src', userPicture);
  usernameElement.appendChild(publishUsername);
  dateElement.appendChild(publishDate);
  titleElement.appendChild(publishTitle);
};

export let authorData = (name, location, work, joined, userPicture) => {
  let authorNameElement = document.getElementById('author-name');
  let authorPicElement = document.getElementById('author-pic');
  let authorLocationElement = document.getElementById('author-location');
  let authorWorkElement = document.getElementById('author-work');
  let authorDateElement = document.getElementById('author-date');
  let authorNameText = document.createTextNode(`${name.first} ${name.last}`);
  let authorLocationText = document.createTextNode(location);
  let authorWorkText = document.createTextNode(work);
  let authorJoinedText = document.createTextNode(joined);
  authorPicElement.setAttribute('src', userPicture);
  authorNameElement.appendChild(authorNameText);
  authorLocationElement.appendChild(authorLocationText);
  authorWorkElement.appendChild(authorWorkText);
  authorDateElement.appendChild(authorJoinedText);
};
