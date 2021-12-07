const loader = document.querySelector(".loader");

//select inputs
const submitBtn = document.querySelector(".register__btn");
const fullName = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number");
const tac = document.querySelector("#terms-and-cond");
const notification = document.querySelector("#notification");

submitBtn.addEventListener("click", () => {
  // if (fullName.value.length < 3) {
  //   showAlert("name must be 3 letters long");
  // } else if (!email.value.length) {
  //   showAlert("enter yout email");
  // } else if (password.value.length < 8) {
  //   showAlert("password should be 8 letters long");
  // } else if (!number.value.length) {
  //   showAlert("enter your phone number");
  // } else if (!Number(number.value) || number.value.length < 8) {
  //   showAlert(
  //     "invalid number, enter 8 digits number. Only Norwegian number allowed"
  //   );
  // } else if (!tac.checked) {
  //   showAlert("you must agree to our terms and condition ");
  // } else {
  //submit the form
  loader.style.display = "block";
  sendData("/signup", {
    name: fullName.value,
    email: email.value,
    password: password.value,
    tac: tac.checked,
    notification: notification.checked,
    seller: false,
  });
  // }
});

//send data function
const sendData = (path, data) => {
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      processData(response);
    });
};

const processData = (data) => {
  loader.style.display = null;
  if (data.alert) {
    showAlert(data.alert);
  }
};

// Alert function
const showAlert = (msg) => {
  let alertBox = document.querySelector(".alert-box");
  let alertMsg = document.querySelector(".alert__msg");
  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};

// console.log(showAlert);
