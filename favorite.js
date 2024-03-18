function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.filter((sneaker) => sneaker.isLike === true))
    .catch((error) => console.error("У тебя ошибка, исправляй", error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector(".sneakers-wrapper");
  wrapper.innerHTML = data
    .map((item) => {
      return `          
          <div class="sneakers-card">
          <button class="sneakers__card-like">
            <img src="../images/like-2.svg" alt="" class="card-like" data-sneaker-id="${item.id}"/>
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

fetchData("https://a57062685adfd13c.mokky.dev/resurs")
  .then((filteredData) => renderSneakers(filteredData))
  .catch((error) =>
    console.error("Произошла ошибка при получении и отображении данных:", error)
  );
