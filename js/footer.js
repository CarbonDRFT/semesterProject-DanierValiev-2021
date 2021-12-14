const createFooter = () => {
  let footer = document.querySelector("footer");

  footer.innerHTML = `
  <div class="footernav">
  <a href="#" class="footer__nav--link">Products</a>
  <a href="#" class="footer__nav--link">About us</a>
  <a href="/login" class="footer__nav--link">Login</a>
  <a href="/signup" class="footer__nav--link">Register</a>
</div>
<img src="/img/logo_white.png" alt="" class="footer__logo" />
<p class="site__creator">Danier Valiev</p>
    `;
};

createFooter();
