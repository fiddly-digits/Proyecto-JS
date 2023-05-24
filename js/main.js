// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob

let getAccountButtons = document
  .querySelectorAll(".login")
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = "./internal/login/login.html";
    };
  });

//CREANDO LISTA DE ARTICULOS/HASHTAG*/
  const createList = () => { 
    let ulList = document.createElement("ul");
    let liElement = document.createElement("li");
    let parrText1 = document.createElement("p");
    let textOfParr1 = document.createTextNode("If Coding Languages Were Ice Cream Flavors...?");//DINAMICO
    let parrText2 = document.createElement("p");
    let textOfParr2 = document.createTextNode("7 comments");//DINAMICO
    ulList.classList.add("list-group", "list-group-flush");
    liElement.classList.add("list-group-item");
    parrText1.classList.add("card-title", "list-group-item--title");
    parrText2.classList.add("card-subtitle", "text-muted", "list-group-item--subtitle");
    parrText1.appendChild(textOfParr1);
    parrText2.appendChild(textOfParr2);
    liElement.append(parrText1, parrText2);

    let liElement2 = document.createElement("li");
    let parrText3= document.createElement("p");
    let textOfParr3 = document.createTextNode("If Coding Languages Were Ice Cream Flavors...?");//DINAMICO
    let parrText4 = document.createElement("p");
    let textOfParr4 = document.createTextNode("7 comments");//DINAMICO
    liElement2.classList.add("list-group-item");
    parrText3.classList.add("card-title", "list-group-item--title");
    parrText4.classList.add("card-subtitle", "text-muted", "list-group-item--subtitle");
    parrText3.appendChild(textOfParr3);
    parrText4.appendChild(textOfParr4);
    liElement2.append(parrText3, parrText4); 

    ulList.append(liElement, liElement2);
    return ulList
}



//CREANDO TITULO DISCUSS
const discussTitle = () => {
  let divTitle = document.createElement("div");
  let parrTitle = document.createElement("p");
  let articleTitle = document.createElement("a");
  let boldTitle = document.createElement("b");
  let textTitle = document.createTextNode("#Sammmmmmmmmm"); //DINAMICO
  divTitle.classList.add("card-header", "d-flex", "justify-content-between", "bg-white", "align-items-center");
  parrTitle.classList.add("card-title", "fs-5", "mb-0");
  articleTitle.classList.add("card-title__hash");
  articleTitle.setAttribute("href", "#");
  boldTitle.appendChild(textTitle);
  articleTitle.appendChild(boldTitle);
  parrTitle.appendChild(articleTitle);
  divTitle.appendChild(parrTitle);
  return divTitle;

}

//<div class="cards-container-right d-flex flex-column gap-4"> (appeNd)

                  // <div class="card">
//CREANDO CONTENEDOR DISCUSS

const discussContainer = () => {
  let divContainer = document.createElement("div");
  let divSecondary = document.createElement("div");
  divContainer.classList.add("cards-container-right", "d-flex", "flex-column", "gap-4");
  divSecondary.classList.add("card");

  let list= createList();
  let title= discussTitle();

  divSecondary.append(title, list);
  divContainer.append(divSecondary);
  return divContainer;

}

 document.getElementById("discuss-list").append(discussContainer());