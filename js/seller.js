let loader = document.querySelector(".loader");

const becomeSellerElement = document.querySelector(".become__seller");
const applyForm = document.querySelector(".seller__apply--form");
const showApplyForBtn = document.querySelector("#seller__idBtn");

window.onload = () => {
  if (sessionStorage.user) {
    let user = JSON.parse(sessionStorage.user);
    if (compareToken(user.authToken, user.email)) {
      becomeSellerElement.classList.remove("hide");
    } else {
      location.replace("/login");
    }
  } else {
    user.replace("/login");
  }
};

showApplyForBtn.addEventListener("click", () => {
  becomeSellerElement.classList.add("hide");
  applyForm.classList.remove("hide");
});

// form submission

// const applyFormButton = document.querySelector("#apply__form--btn");
// const businessName = document.querySelector("#business__user");
// const businessAddress = document.querySelector("#business__add");
// const businessAbout = document.querySelector("#business__about");
// const businessNumber = document.querySelector("#business__number");
// const businessTac = document.querySelector("#terms-and-cond");
// const legitInfo = document.querySelector("#legitInfo");

// applyFormButton.addEventListener("click", () => {
//   if (
//     !businessName.value.length ||
//     !businessAddress.value.length ||
//     !businessAbout.value.length ||
//     !businessNumber.value.length
//   ) {
//     showAlert("Fill all the inputs");
//   } else if (!tac.checked || !legitInfo.checked) {
//     showAlert("you must agree to our terms and conditions");
//   } else {
//     making server request
//   }
// });
