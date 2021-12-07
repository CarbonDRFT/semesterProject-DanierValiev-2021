const createNav = () => {
    let nav = document.querySelector('.primary-header','.flex');
    nav.innerHTML= `
    <div class="logo__container">
        <img src="./img/logo.png" alt="logo" />
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
              href="#"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"> 01</span>Products</a
            >
          </li>
          <li class="active">
            <a
              href="#"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"> 02</span>About Us</a
            >
          </li>
          <li class="active">
            <a
              href="#"
              class="ff-sans-cond uppercase text-white letter-spacing-2"
              ><span area-hidden="true"> 03</span>Contact us</a
            >
          </li>
          <div class="search"><input type="text" class="search__box" placeholder="search brand, product">
        <button class="search__btn">search</button></div>
        <a href="#" class="ff-sans-cond uppercase text-white letter-spacing-2"><img src="/img/user-circle-solid.svg" alt="login__icon" class="login__icon"></a>
        <a href="#" class="ff-sans-cond uppercase text-white letter-spacing-2"><img src="/img/shopping-cart-solid.svg" alt="cart__icon" class="cart__icon"></a>
        </ul>
      </nav>
    `;
}

createNav();


const primaryNav = document.querySelector('.primary-navigation');
const navToggle = document.querySelector('.mobile__nav--toggle');

navToggle.addEventListener('click', () => {
const visibility = primaryNav.getAttribute('data-visible')

if (visibility === "false"){
    primaryNav.setAttribute('data-visible', true);
    navToggle.setAttribute('aria-expanded', true)
} else if (visibility === "true") {
    primaryNav.setAttribute('data-visible', false)
    navToggle.setAttribute('aria-expanded', false)
}
})

let lastScrollTop = 0;
    navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        if (scrollLeft > lastScrollTop) {
            navbar.style.Left="100px";
        } else {
            navbar.style.Left="-100px"
        }
        lastScrollTop = scrollLeft
    })


