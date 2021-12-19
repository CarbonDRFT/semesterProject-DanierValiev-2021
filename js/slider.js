const setupSlidingEffect = () => {
  const productContainers = [
    ...document.querySelectorAll(".product__container"),
  ];
  const nxtBtn = [...document.querySelectorAll(".nxt__btn")];
  const preBtn = [...document.querySelectorAll(".pre__btn")];

  productContainers.forEach((item, i) => {
    let containerDimenstions = item.getBoundingClientRect();
    let containerWidth = containerDimenstions.width;

    nxtBtn[i].addEventListener("click", () => {
      item.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener("click", () => {
      item.scrollLeft -= containerWidth;
    });
  });
};

// fetch product cards
const getProducts = (tag) => {
  return fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ tag: tag }),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

// create product slider
const createProductSlider = (data, parent, title) => {
  let slideContainer = document.querySelector(`${parent}`);

  slideContainer.innerHTML += `
      <section class="product">
          <h2 class="product__category">${title}</h2>
          <button class="pre__btn"><img src="../img/arrow.png" alt=""></button>
          <button class="nxt__btn"><img src="../img/arrow.png" alt=""></button>
          ${createProductCards(data)}
      </section>
      `;
  setupSlidingEffect();
};

const createProductCards = (data, parent) => {
  //here parent is for search product
  let start = '<div class="product__container">';
  let middle = ""; // this will contain card HTML
  let end = "</div>";

  for (let i = 0; i < data.length; i++) {
    if (data[i].id != decodeURI(location.pathname.split("/").pop())) {
      middle += `
              <div class="product__card">
                  <div class="product__image">
                  ${
                    data[i].discount != 0
                      ? `<span class="tag">${data[i].discount}% Off</span>`
                      : ""
                  }
                      <img src="${
                        data[i].images[0]
                      }" class="product__thumb" alt="product image" onclick="location.href = '/products/${
        data[i].id
      }'">
                  </div>
                  <div class="product__info" onclick="location.href = '/products/${
                    data[i].id
                  }'">
                      <h3 class="product__brand">${data[i].name}</h3>
                      <p class="product__short--des">${data[i].shortDes}</p>
                      <span class="price">$${data[i].sellPrice}
                      ${
                        data[i].discount != 0
                          ? `</span> <span class="actual__price">$${data[i].actualPrice}</span>`
                          : ""
                      }
                      
                  </div>
              </div>
              `;
    }
  }

  if (parent) {
    let cardContainer = document.querySelector(parent);
    cardContainer.innerHTML = start + middle + end;
  } else {
    return start + middle + end;
  }
};

const add_product_to_cart_or_wishlist = (type, product) => {
  let data = JSON.parse(localStorage.getItem(type));
  if (data == null) {
    data = [];
  }

  product = {
    item: 1,
    name: product.name,
    sellPrice: product.sellPrice,
    size: size || null,
    shortDes: product.shortDes,
    image: product.images[0],
  };

  data.push(product);
  localStorage.setItem(type, JSON.stringify(data));
  return "added";
};
