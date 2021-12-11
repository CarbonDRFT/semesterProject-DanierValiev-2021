let loader = document.querySelector(".loader");
let user = JSON.parse(sessionStorage.user || null);

const becomeSellerElement = document.querySelector(".become__seller");
const productListingElement = document.querySelector(".product__listing");
const applyForm = document.querySelector(".seller__apply--form");
const showApplyForBtn = document.querySelector("#seller__idBtn");

window.onload = () => {
  if (user) {
    if (compareToken(user.authToken, user.email)) {
      if (!user.seller) {
        becomeSellerElement.classList.remove("hide__seller");
      } else {
        loader.style.display = "block";
        setupProducts();
      }
    } else {
      location.replace("/login");
    }
  } else {
    location.replace("/login");
  }
};

showApplyForBtn.addEventListener("click", () => {
  becomeSellerElement.classList.add("hide__seller");
  applyForm.classList.remove("hide__seller");
});

//form submission

const applyFormButton = document.querySelector("#apply__form--btn");
const businessName = document.querySelector("#business__user");
const businessAddress = document.querySelector("#business__add");
const businessAbout = document.querySelector("#business__about");
const businessNumber = document.querySelector("#business__number");
const businessTac = document.querySelector("#terms-and-cond");
const legitInfo = document.querySelector("#legitInfo");

applyFormButton.addEventListener("click", () => {
  if (
    !businessName.value.length ||
    !businessAddress.value.length ||
    !businessAbout.value.length ||
    !businessNumber.value.length
  ) {
    showAlert("Fill all the inputs");
  } else if (!businessTac.checked || !legitInfo.checked) {
    showAlert("you must agree to our terms and conditions");
  } else {
    //making server request
    loader.style.display = "block";
    sendData("/seller", {
      fullName: businessName.value,
      businessAddress: businessAddress.value,
      businessAbout: businessAbout.value,
      businessNumber: businessNumber.value,
      tac: businessTac.checked,
      legit: legitInfo.checked,
      email: JSON.parse(sessionStorage.user).email,
    });
  }
});

const setupProducts = () => {
  fetch("/get-products", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ email: user.email }),
  })
    .then((res) => res.json())
    .then((data) => {
      loader.style.display = null;
      productListingElement.classList.remove("hide__seller");
      if (data == "no products") {
        let emptySVG = document.querySelector(".no__product--image");
        emptySVG.classList.remove("hide__seller");
      } else {
        data.forEach((product) => createProduct(product));
      }
    });
};
