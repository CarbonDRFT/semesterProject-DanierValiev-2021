let char = `123abcde.fmnopqlABCDE@FJKLMNOPQRSTUVWXYZ456789stuvwxyz0!#$%&ijkrgh'*+-/=?^_${"`"}{|}~`;

const generateToken = (key) => {
  let token = "";
  for (let i = 0; i < key.length; i++) {
    let index = char.indexOf(key[i]) || char.length / 2;
    let randomIndex = Math.floor(Math.random() * index);
    token += char[randomIndex] + char[index - randomIndex];
  }
  return token;
};

const compareToken = (token, key) => {
  let string = "";
  for (let i = 0; i < token.length; i = i + 2) {
    let index1 = char.indexOf(token[i]);
    let index2 = char.indexOf(token[i + 1]);
    string += char[index1 + index2];
  }

  if (string === key) {
    return true;
  }
  return false;
};

// common functions

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
  } else if (data) {
    //create authToken
    data.authToken = generateToken(data.email);
    sessionStorage.user = JSON.stringify(data);
    location.replace("/");
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
