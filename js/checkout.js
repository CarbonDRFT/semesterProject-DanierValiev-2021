window.onload = () => {
  if (!sessionStorage.user) {
    loaction.replace("/login");
  }
};

const placeOrderBtn = document.querySelector(".place__order--btn");
placeOrderBtn.addEventListener("click", () => {
  let address = getAddress();

  if (address) {
    fetch("/order", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        order: JSON.parse(localStorage.cart),
        email: JSON.parse(sessionStorage.user).email,
        add: address,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.alert == "your order is placed") {
          delete localStorage.cart;
          showAlert(data.alert, "success");
        } else {
          showAlert(data.alert);
        }
      });
  }
});

const getAddress = () => {
  // validation
  let fullCustName = document.querySelector("#fullName").value;
  let email = document.querySelector("#email").value;
  let address = document.querySelector("#address").value;
  let pincode = document.querySelector("#pincode").value;
  let city = document.querySelector("#city").value;
  let country = document.querySelector("#country").value;

  if (
    !fullCustName.length ||
    !email.length ||
    !address.length ||
    !pincode.length ||
    !city.length ||
    !country.length
  ) {
    return showAlert("fill all the inputs first");
  } else {
    return { fullCustName, email, address, pincode, city, country };
  }
};
