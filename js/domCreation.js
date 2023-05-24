//* Aqui trabajan Sam y Max

//CREANDO BOOKMARK listo
const createBookmarkComponent = () => {
  let wrapper= document.createElement("div");
  let text= document.createElement("p");
  let anchor = document.createElement("a")
  let icon= document.createElement("i");
  let textNode = document.createTextNode("4 min read")
  wrapper.classList.add("bookmark", "d-flex", "gap-2", "justify-content-center");
  text.classList.add("bookmark__item");
  icon.classList.add("iconoir-bookmark-empty","icons-style-sm");
  text.appendChild(textNode)
  anchor.setAttribute("href", "#");
  anchor.appendChild(icon);
  wrapper.append(text, anchor);
  return wrapper;
}

//CREANDO INTERACCIONES LISTO
const createInteractionsComponent = () => {
  let bookmarkComponent = createBookmarkComponent()
  let wrapperInteractions= document.createElement("div");
  let reactions= document.createElement("div");
  let textReactions= document.createElement("a");
  let iconAnchor = document.createElement("a");
  let iconComment= document.createElement("i");
  let textNode = document.createTextNode("9 Reactions")
  let addCommentText = document.createTextNode("Add Comment") 
  wrapperInteractions.classList.add("interactions", "d-flex", "flex-wrap","justify-content-between");
  reactions.classList.add("reactions", "d-flex", "gap-3");
  textReactions.classList.add("reactions__item");
  iconAnchor.classList.add("reactions__item");
  iconComment.classList.add("iconoir-chat-bubble-empty", "reactions__item__bubble"); 
  iconAnchor.append(iconComment, addCommentText);
  textReactions.appendChild(textNode);
  reactions.append(textReactions, iconAnchor)
  wrapperInteractions.append(reactions, bookmarkComponent)
  return wrapperInteractions;
}

//CREANDO HASHTAGS listo

const createHashtagComponent= () => {
  let wrapperHashtags= document.createElement("div");
  let elementHashtag1= document.createElement("a");
  let TextHashtag1 = document.createTextNode("#javascript");//DINAMICO
  let elementHashtag2= document.createElement("a");
  let TextHashtag2 = document.createTextNode("#frontend");//DINAMICO
  let elementHashtag3= document.createElement("a");
  let TextHashtag3 = document.createTextNode("#tutorial");//DINAMICO
  let elementHashtag4= document.createElement("a");
  let TextHashtag4 = document.createTextNode("#animation");//DINAMICO
  wrapperHashtags.classList.add("hashtags", "d-flex", "flex-wrap", "gap-4", "mb-3");
  elementHashtag1.classList.add("hashtags__item");
  elementHashtag2.classList.add("hashtags__item");
  elementHashtag3.classList.add("hashtags__item");
  elementHashtag4.classList.add("hashtags__item");
  elementHashtag1.appendChild(TextHashtag1);
  elementHashtag2.appendChild(TextHashtag2);
  elementHashtag3.appendChild(TextHashtag3);
  elementHashtag4.appendChild(TextHashtag4);
  wrapperHashtags.append(elementHashtag1, elementHashtag2, elementHashtag3,elementHashtag4);
  return wrapperHashtags;

}

//CREANDO TEXTO LISTO


 const createText= () => {
  let wrapperTextArticle= document.createElement("h3");
  let textArticle= document.createTextNode("Let's make a cool mouse event bubble animation in just 50 lines of JavaScript!"); //Cambiar Despues
  wrapperTextArticle.classList.add("card-text", "card-text--article", "mb-2");
  wrapperTextArticle.append(textArticle);
  return wrapperTextArticle;
 }



//CREANDO SUBTITULO LISTO

const createSubtitle=() =>{
  let textSubtitleContainer= document.createElement("p");
  let dateSubtitle=document.createElement("span");
  let texSubtitle = document.createTextNode( "May 19 (8 hours ago)")//DINAMICO
  textSubtitleContainer.classList.add("card-subtitle");
  dateSubtitle.classList.add("card-subtitle--date");
  dateSubtitle.appendChild(texSubtitle);
  textSubtitleContainer.append(dateSubtitle);
  return textSubtitleContainer;
}

//CREANDO TITULO listo


const createTitle= () => {
  let titleContainer= document.createElement("p");
  let title= document.createElement("span");  
  let textTitle = document.createTextNode("Renan Ferro");//DINAMICO
  titleContainer.classList.add("card-title");
  title.classList.add("card-title--user");
  title.appendChild(textTitle);
  titleContainer.append(title);
  return titleContainer;
}

//CREANDO CONTAINER SECUNDARIO
 const createSecondaryContainer= () => {
  let interactionsComponent = createInteractionsComponent();
  let hashtagsComponent= createHashtagComponent();
  let textComponent= createText();
  let subtitleComponent= createSubtitle();
  let titleComponent= createTitle();
  let secondaryContainer= document.createElement("div");
  secondaryContainer.classList.add("d-flex", "flex-column", "ps-2");
  secondaryContainer.append( titleComponent, subtitleComponent, textComponent, hashtagsComponent, interactionsComponent);
  return secondaryContainer;
 }


 //CREANDO IMAGEN USUARIO

 
 const createUserImage = () => {
  let anchor = document.createElement("a");
  let userImage = document.createElement("img");
  userImage.setAttribute("src", "https://randomuser.me/api/portraits/lego/6.jpg");//DINAMICO  
  userImage.setAttribute("alt", "user");
  userImage.setAttribute("width", "35");
  userImage.setAttribute("height", "35");
  userImage.classList.add("circle-profile-picture--nohover");
  anchor.appendChild(userImage)
  return anchor
}

//CREANDO CARD BODY
const createCardBody = () => {
  let componentUserImage = createUserImage();
  let componentSecondary = createSecondaryContainer();
  let cardBody= document.createElement("div");
  cardBody.classList.add("card-body", "d-flex");
  cardBody.append(componentUserImage, componentSecondary);
  return cardBody;
}

//CREANDO IMAGEN PRINCIPAL
const createMainImage= () => {
  let mainImage= document.createElement("img");
  mainImage.classList.add("card-img-top");
  mainImage.setAttribute("src", "https://res.cloudinary.com/practicaldev/image/fetch/s---uXKaq95--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ab4mzs8912oxv5vrmxo1.jpg")
  mainImage.setAttribute("alt", "...")
  return mainImage;
}

// CREANDO DIV CONTAINER
const createMainCard = () => {
  let card = document.createElement("div");
  let topImage = createMainImage();
  let cardBody = createCardBody();
  card.classList.add("card");
  card.append(topImage, cardBody);
  return card;
}

const addCardToDom = () => {
    let mainContainer = document.querySelector(".cards-container-main");
    let card = createMainCard();
    mainContainer.appendChild(card);
}