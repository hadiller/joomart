function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error("У тебя ошибка, исправляй", error));
}
function fetchOrders() {
  return fetch("https://a57062685adfd13c.mokky.dev/orders")
    .then((response) => response.json())
    .catch((error) => console.error("У тебя ошибка, исправляй", error));
}

function renderSneakers(data, orders) {
  let wrapper = document.querySelector(".sneakers-wrapper");
  wrapper.innerHTML = data
    .map((item) => {
      const isOrdered = orders.some((order) => order.sneakerId === item.id);
      return `          
        <div class="sneakers-card">
        <button class="sneakers__card-like">
          <img 
            src="./images/${item.isLike ? "like-2.svg" : "like-1.svg"}" 
            data-is-like="${item.isLike ? "true" : "false"}"
            alt="" 
            class="card-like" 
            data-sneaker-id="${item.id}"
          />
        </button>
        <img
          src="./images${item.imageUrl}"
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
            <img src="./images/${
              isOrdered ? "checked.svg" : "plus.svg"
            }" alt="" class="card-plus" />
          </button>
        </div>
      </div>`;
    })
    .join("");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("card-like")) {
    const sneakerId = target.dataset.sneakerId;
    const isLiked = target.dataset.isLike === "true";

    fetch(`https://a57062685adfd13c.mokky.dev/resurs/${sneakerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLike: !isLiked }),
    })
      .then((response) => response.json())
      .then(() => {
        target.dataset.isLike = String(!isLiked);
        target.setAttribute(
          "src",
          `./images/${!isLiked ? "like-2.svg" : "like-1.svg"}`
        );
      })
      .catch((error) => {
        console.error("Исправляй ошибку", error);
      });
  }
});

fetchData("https://a57062685adfd13c.mokky.dev/resurs").then((data) =>
  fetchOrders().then((orders) => {
    renderSneakers(data, orders);
  })
);
document.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("card-plus")) {
    const card = target.closest(".sneakers-card");
    let title = card.querySelector(".sneakers__card-title").innerText;
    let price = card
      .querySelector(".sneakers__action-price b")
      .innerText.replace("$", "");
    let img = card
      .querySelector(".sneakers__card-img")
      .getAttribute("src")
      .replace("./images", "");
    let sneakerId = card.querySelector(".card-like").dataset.sneakerId;

    fetch("https://a57062685adfd13c.mokky.dev/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: Number(price),
        imageUrl: img,
        sneakerId: Number(sneakerId),
      }),
    })
      .then((response) => response.json())
      .then((data) => target.setAttribute("src", "./images/checked.svg"))
      .catch((err) => console.log(err));
  }
});
