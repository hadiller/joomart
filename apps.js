function fetchData(api) {
  return fetch(api)
    .then((response) => response.json())
    .catch((error) => console.error('У тебя ошибка, исправляй', error));
}

function renderSneakers(data) {
  let wrapper = document.querySelector('.sneakers-wrapper');
  wrapper.innerHTML = data
    .map((item) => {
      return `          
        <div class="sneakers-card">
        <button class="sneakers__card-like">
          <img 
            src="./images/${item.isLike ? 'like-2.svg' : 'like-1.svg'}" 
            data-is-like="${item.isLike ? 'true' : 'false'}"
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
            <img src="./images/plus.svg" alt=""  />
          </button>
        </div>
      </div>`;
    })
    .join('');
}




document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('card-like')) {
    const sneakerId = target.dataset.sneakerId;
    const isLiked = target.dataset.isLike === 'true';

    fetch(`https://a57062685adfd13c.mokky.dev/resurs/${sneakerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isLike: !isLiked }),
    })
      .then((response) => response.json())
      .then(() => {
        target.dataset.isLike = String(!isLiked);
        target.setAttribute(
          'src',
          `./images/${!isLiked ? 'like-2.svg' : 'like-1.svg'}`
        );
      })
      .catch((error) => {
        console.error('Исправляй ошибку', error);
      });
  }
});

fetchData('https://5c782080f150df17.mokky.dev/items').then((data) =>
  renderSneakers(data)
);
