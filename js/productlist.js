getProducts("men").then((data) =>
  createProductSlider(data, ".men__product--section", "Men")
);

getProducts("women").then((data) =>
  createProductSlider(data, ".female__product--section", "Women")
);

getProducts("kids").then((data) =>
  createProductSlider(data, ".kids__product--section", "Kids")
);

let categories = document.querySelectorAll(".productlist__link a");
categories.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    let sections = document.querySelectorAll(".product-categories-section");
    sections.forEach((section) => (section.style.display = "none"));

    let targetEle = link.getAttribute("target-element");
    if (targetEle == "all") {
      sections.forEach((section) => (section.style.display = "block"));
    } else {
      let section = document.querySelector(
        `.productlist__container .${targetEle}`
      );
      console.log(section);
      section.style.display = "block";
    }
  });
});
