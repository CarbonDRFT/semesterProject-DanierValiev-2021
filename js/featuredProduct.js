let featuredProductListOne;

const fetchFeaturedProducts = () => {
  fetch("featured-products")
    .then((res) => res.json())
    .then((data) => {
      if (data != "no featured products") {
        featuredProductListOne = data;
        makeFeaturedProductCards(featuredProductListOne);
      } else {
        console.log(data);
      }
      console.log(data);
    });
};

const makeFeaturedProductCards = (data) => {
  const featured_product_container = document.querySelector(
    ".featured-product-container"
  );

  data.forEach((card) => {
    featured_product_container.innerHTML += createfeauredcard(card);
  });
  setupLoopSlider();
};

const createfeauredcard = (card) => {
  return `
  <div class="swiper-slide">
    <div class="product__card" onclick="location.href = '/products/${card.id}'">
        <div class="product__image">
            ${
              card.discount != 0
                ? `<span class="tag">${card.discount}% Off</span>`
                : ""
            }        
            <img src="${
              card.images[0]
            }" class="product__thumb" alt="product image">
        </div>
        <div class="product__info product__info--sellerPage"'>
            <h3 class="product__brand">${card.name.slice(0, 18) + "..."}</h3>
            <p class="product__short--des">${card.shortDes}</p>
            <span class="price">$${card.sellPrice}</span> 
            ${
              card.discount != 0
                ? `<span class="actual__price">$${card.actualPrice}</span>`
                : ""
            }
        </div>
    </div>
  </div>
    `;
};

const setupLoopSlider = () => {
  const swiper = new Swiper(".slider-container", {
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      670: {
        slidesPerView: 2,
        spaceBetween: -50,
      },
      923: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
    },
    slidesPerGroup: 1,
    loopFillGroupWithBlank: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-nxt",
      prevEl: ".swiper-button-pre",
    },
  });
};

fetchFeaturedProducts();
