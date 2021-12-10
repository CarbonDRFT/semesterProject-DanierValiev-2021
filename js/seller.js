let loader = document.querySelector(".loader");

const becomeSellerElement = document.querySelector(".become__seller");
const productListingElement = document.querySelector(".product__listing");
const applyForm = document.querySelector(".seller__apply--form");
const showApplyForBtn = document.querySelector("#seller__idBtn");

window.onload = () => {
  if (sessionStorage.user) {
    let user = JSON.parse(sessionStorage.user);
    if (compareToken(user.authToken, user.email)) {
      if (!user.seller) {
        becomeSellerElement.classList.remove("hide__seller");
      } else {
        productListingElement.classList.remove("hide__seller");
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
