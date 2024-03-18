function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error("У тебя ошибка, исправляй", error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector(".sneakers-wrapper");
  wrapper.innerHTML = data
    .map((item) => {
      return `          
            <div class="sneakers-card">
            <button class="sneakers__card-like">
              <img src="./images/like-1.svg" alt="" class="card-like" data-sneaker-id="${item.id}" data-fav-id="-1"/>
            </button>
            <img
              src="../images/${item.imageUrl}"
              alt=""
              class="sneakers__card-img"
            />
            <h4 class="sneakers__card-title">
              ${item.title}
            </h4>
            <div class="sneakers__card-actions">
              <div class="sneakers__action-price">
                <p>Цена</p>
                <b>${item.price}$</b>
              </div>
              <button class="sneakers__actions-cart">
                <img src="./images/plus.svg" alt="" />
              </button>
            </div>
          </div>`;
    })
    .join("");
}

let cardLike = document.querySelector(".card-like");

function addLike(sneakersID) {
  return fetch("https://0348dd6250bed296.mokky.dev/ttttt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ like: sneakersID }),
  })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.log("error: ", error));
}

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-like")) {
    if (event.target.src === "http://127.0.0.1:5500/images/like-1.svg") {
      event.target.src = "http://127.0.0.1:5500/images/like-2.svg";
      const sneakerId = event.target.dataset.sneakerId;
      console.log(sneakerId);
      addLike(sneakerId).then((json) => (event.target.dataset.favId = json.id));
    } else {
      event.target.src = "http://127.0.0.1:5500/images/like-1.svg";
      const likeId = event.target.dataset.favId;
      removeLike(likeId);
    }
  }
});

function renderSneakers(likedSneakers) {
  let favImgs = document.querySelectorAll(".card-like");

  favImgs.forEach((favImg) => {
    let sneakerId = favImg.dataset.sneakerId;
    if (likedSneakers.some((sneaker) => sneaker.sneakerId === sneakerId)) {
      favImgs.src = "../images/like-2.svg";
    }
  });
}

fetchData("https://5c782080f150df17.mokky.dev/items").then((data) => {
  renderSneakers(data);
  fetch("https://a57062685adfd13c.mokky.dev/erver")
    .then((response) => response.json())
    .then((data) => {
      likedSneakers(data);
    });
});
