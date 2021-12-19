// create small product cards
const createSmallCards = (data) => {
  return `
    <div class="sm__product">
        <img src="${data.image}" class="sm__product--img" alt="">
        <div class="sm__text">
            <h3 class="sm__product--name">${data.name}</h3>
            <p class="sm__des">${data.shortDes}</p>
        </div>
        <div class="item__counter">
            <button class="counter__btn decrement">-</button>
            <p class="item__count">${data.item}</p>
            <button class="counter__btn increment">+</button>
        </div>
        <p class="sm__price" data-price="${data.sellPrice}">$${
    data.sellPrice * data.item
  }</p>
        <button class="sm__delete--btn"><img src="img/close.png" alt=""></button>
    </div>
    `;
};

let totalBill = 0;

const setProducts = (name) => {
  const element = document.querySelector(`.${name}`);
  let data = JSON.parse(localStorage.getItem(name));
  if (data == null) {
    element.innerHTML = `<img src="../img/empty-cart.png" class="empty__img" alt="empty">`;
  } else {
    for (let i = 0; i < data.length; i++) {
      element.innerHTML += createSmallCards(data[i]);
      if (name == "cart") {
        totalBill += Number(data[i].sellPrice * data[i].item);
      }
      updateBill();
    }
  }

  setupEvents(name);
};

const updateBill = () => {
  let billPrice = document.querySelector(".bill");
  billPrice.innerHTML = `$${totalBill}`;
};

const setupEvents = (name) => {
  // setup counter event
  const counterMinus = document.querySelectorAll(`.${name} .decrement`);
  const counterPlus = document.querySelectorAll(`.${name} .increment`);
  const counts = document.querySelectorAll(`.${name} .item__count`);
  const price = document.querySelectorAll(`.${name} .sm__price`);
  const deleteBtn = document.querySelectorAll(`.${name} .sm__delete--btn`);

  let product = JSON.parse(localStorage.getItem(name));

  counts.forEach((item, i) => {
    let cost = Number(price[i].getAttribute("data-price"));

    counterMinus[i].addEventListener("click", () => {
      if (item.innerHTML > 1) {
        item.innerHTML--;
        totalBill -= cost;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        if (name == "cart") {
          updateBill();
        }
        product[i].item = item.innerHTML;
        localStorage.setItem(name, JSON.stringify(product));
      }
    });
    counterPlus[i].addEventListener("click", () => {
      if (item.innerHTML < 9) {
        item.innerHTML++;
        totalBill += cost;
        price[i].innerHTML = `$${item.innerHTML * cost}`;
        if (name == "cart") {
          updateBill();
        }
        product[i].item = item.innerHTML;
        localStorage.setItem(name, JSON.stringify(product));
      }
    });
  });

  deleteBtn.forEach((item, i) => {
    item.addEventListener("click", () => {
      product = product.filter((data, index) => index != i);
      localStorage.setItem(name, JSON.stringify(product));
      location.reload();
    });
  });
};

setProducts("cart");
setProducts("wishlist");
