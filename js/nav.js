const createNav = () => {
  let nav = document.querySelector(".primary__header", ".flex");
  nav.innerHTML = `
    <div class="logo__container" onclick="location.href="/index.html"'>
        <img src="../img/logo.png" alt="logo" class="logo" />
      </div>

      <button
        aria-controls="primary-navigation"
        aria-expanded="false"
        class="mobile__nav--toggle"
      >
        <span class="sr-only">Menu</span>
      </button>

      <nav id="navbar">
        <ul
          id="primary-navigation"
          data-visible="false"
          class="primary-navigation flex"
        >
          <li class="active">
            <a
              href="/productlist.html"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"></span>Products</a
            >
          </li>
          <li class="active">
            <a
              href="#"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"></span>About Us</a
            >
          </li>
          <li class="active">
            <a
              href="/seller"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"></span>Dashboard</a
            >
          </li>
          <div class="search"><input type="text" class="search__box" id="search__box" placeholder="search product">
        <button class="search__btn">search</button></div>
        <a  class="ff-sans-cond uppercase text-white letter-spacing-2">
        <img src="/img/user-circle-solid.svg" alt="login__icon" class="login__icon">
        <div class="login__logout--popup hide__login">
        <p class="account__info">Log in as, name</p>
        <button class="btn__login" id="user__btn">Log out</button>
        </div>

        </a>
        <a href="/cart" class="ff-sans-cond uppercase text-white letter-spacing-2"><img src="/img/shopping-cart-solid.svg" alt="cart__icon" class="cart__icon"></a>
        </ul>
      </nav>
    `;
};

createNav();

const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile__nav--toggle");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

let lastScrollTop = 0;
navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  if (scrollLeft > lastScrollTop) {
    navbar.style.Left = "100px";
  } else {
    navbar.style.Left = "-100px";
  }
  lastScrollTop = scrollLeft;
});

//nav popup
const userImageButton = document.querySelector(".login__icon");
const userPop = document.querySelector(".login__logout--popup");
const popupText = document.querySelector(".account__info");
const actionBtn = document.querySelector("#user__btn");

userImageButton.addEventListener("click", () => {
  userPop.classList.toggle("hide__login");
});

window.onload = () => {
  let user = JSON.parse(sessionStorage.user || null);
  if (user != null) {
    // means user is logged in
    popupText.innerHTML = `logged in as, ${user.name}`;
    actionBtn.innerHTML = "log out";
    actionBtn.addEventListener("click", () => {
      sessionStorage.clear();
      location.reload();
    });
  } else {
    // user is logged out
    popupText.innerHTML = "log in to place order";
    actionBtn.innerHTML = "Log in";
    actionBtn.addEventListener("click", () => {
      location.href = "/login";
    });
  }
};

// search box
const searchBtn = document.querySelector(".search__btn");
const searchBox = document.querySelector(".search__box");
searchBtn.addEventListener("click", () => {
  if (searchBox.value.length) {
    location.href = `/search/${searchBox.value}`;
  }
});
