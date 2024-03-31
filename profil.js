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
            <img 
              src="../images/${item.isLike ? "like-2.svg" : "like-1.svg"}" 
              data-is-like="${item.isLike ? "true" : "false"}"
              alt="" 
              class="card-like" 
              data-sneaker-id="${item.id}"
            />
          </button>
          <img
            src="../images${item.imageUrl}"
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
              <img src="../images/checked.svg" alt="" class="card-plus" />
            </button>
          </div>
        </div>`;
    })
    .join("");
}

let total = 0;
fetchData("https://a57062685adfd13c.mokky.dev/orders")
  .then((response) => {
    renderSneakers(response);
    return response.map((sneaker) => sneaker.price);
  })
  .then((data) => {
    total = data.reduce((sum, price) => sum + price, 0);
    document.querySelector("#total").innerHTML = total;
    document.querySelector("#tax").innerHTML = total * 0.05;
  })
.catch((err) => console.log(err));