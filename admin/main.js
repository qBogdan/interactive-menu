function adminInit(recipes, categories) {
  displayCategories(categories);
}

function displayCategories(categories) {
  categories.forEach((cat) => {
    const thisCat = div();
    thisCat.classList.add("category");
    thisCat.innerText = cat;
    thisCat.dataset.category = cat;
    $(".categories").append(thisCat);
  });
}
function initEvents() {
  document.getElementById("categories").addEventListener("click", function (e) {
    if (e.target.matches("a")) {
      var id = e.target.getAttribute("data-category");
      showPage(id);
    }
  });
}
document.getElementById("category").addEventListener("click", function () {
  if (this.class.contains("active")) {
    this.class.remove("active");
  } else this.class.add("active");
});

adminInit();
