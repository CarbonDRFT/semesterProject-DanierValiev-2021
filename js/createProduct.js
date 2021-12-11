let openEditor;

const createProduct = (data) => {
  openEditor = () => {
    sessionStorage.tempProduct = JSON.stringify(data);
    location.href = `/add-product/${data.id}`;
  };

  let productContainer = document.querySelector(".product__container");
  productContainer.innerHTML += `
    <div class="product__card">
        <div class="product__image">
            ${data.draft ? `<span class="tag">Draft</span>` : ""}            
            <img src="${
              data.images[0] || "img/no image.png"
            } " class="product__thumb" alt="">
            <button class="card__action--btn edit__btn" onclick="openEditor()"><img src="img/edit.png" alt=""></button>
            <button class="card__action--btn open__btn" onclick="location.href = 
            '/${data.id}'"><img src="img/open.png" alt=""></button>
            <button class="card__action--btn delete__popup--btn" onclick="openDeletePopup('${
              data.id
            }')"><img src="img/delete.png" alt=""></button>
        </div>
        <div class="product__info product__info--sellerPage">
            <h2 class="product__brand">${data.name}</h2>
            <p class="product__short--des">${data.shortDes}</p>
            <span class="price">$${data.sellPrice}</span> 
            <span class="actual__price">$${data.actualPrice}</span>
        </div>
    </div>
    `;
};

const openDeletePopup = (id) => {
  let deleteAlert = document.querySelector(".delete__alert");
  deleteAlert.style.display = "flex";

  let closeBtn = document.querySelector(".close__btn");
  closeBtn.addEventListener("click", () => (deleteAlert.style.display = null));

  let deleteBtn = document.querySelector(".delete__btn");
  deleteBtn.addEventListener("click", () => deleteItem(id));
};

const deleteItem = (id) => {
  fetch("/delete-product", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id: id }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data == "success") {
        location.reload();
      } else {
        showAlert("some error occured while deleting the product. Try Again");
      }
    });
};
