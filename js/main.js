// * Pagination - esta funcion agrega enlace los botones que llevan al login
// * Aca trabaja Rob

let getAccountButtons = document
  .querySelectorAll(".login")
  .forEach((loginButton) => {
    loginButton.onclick = function () {
      location.href = "./internal/login/login.html";
    };
  });
/*
                  <div class="card">
                    <img
                      src="https://res.cloudinary.com/practicaldev/image/fetch/s---uXKaq95--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ab4mzs8912oxv5vrmxo1.jpg"
                      class="card-img-top"
                      alt="..."
                    />
                    <div class="card-body d-flex">
                      <a href="">
                        <img
                          src="https://randomuser.me/api/portraits/lego/6.jpg"
                          alt="user"
                          width="35"
                          height="35"
                          class="circle-profile-picture--nohover"
                        />
                      </a>
                      <div class="d-flex flex-column ps-2">
                        <p class="card-title">
                          <span class="card-title--user">Renan Ferro</span>
                        </p>
                        <p class="card-subtitle">
                          <span class="card-subtitle--date"
                            >May 19 (8 hours ago)</span
                          >
                        </p>
                        <h3 class="card-text card-text--article mb-2">
                          Let's make a cool mouse event bubble animation in just
                          50 lines of JavaScript!
                        </h3>
                        <div class="hashtags d-flex flex-wrap gap-4 mb-3">
                          <a href="." class="hashtags__item">#javascript</a>
                          <a href="." class="hashtags__item">#frontend</a>
                          <a href="." class="hashtags__item">#tutorial</a>
                          <a href="." class="hashtags__item">#animation</a>
                        </div>
                        <div
                          class="interactions d-flex flex-wrap justify-content-between"
                        >
                          <div class="reactions d-flex gap-3">
                            <a href="" class="reactions__item">9 Reactions</a>
                            <a href="" class="reactions__item"
                              ><i
                                class="iconoir-chat-bubble-empty reactions__item__bubble"
                              ></i
                              >Add Comment</a
                            >
                          </div>
                          <div
                            class="bookmark d-flex gap-2 justify-content-center"
                          >
                            <p class="bookmark__item">4 min read</p>
                            <a href=""
                              ><i
                                class="iconoir-bookmark-empty icons-style-sm"
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

*/
let createPost = () => {
  let card = document.createElement("div");
  let text = document.createTextNode("HOLA SOY UNA CARTA");
  card.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "d-flex");
  card.append(cardBody, text);
  console.log(card);
  return card;
};

let card = createPost();
let cardsContainer = document.querySelector(".cards-container-main");
console.log(cardsContainer);
cardsContainer.appendChild(card);
