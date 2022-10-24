function adminInit(recipes, categories) {
    console.log(categories);
    displayCategories(categories);
    initEvents();
}

function displayCategories(categories) {
    // adauga butoane pentru fiecare categorie
    console.log(categories);
    categories.forEach(cat => {
        const thisCat = div();
        thisCat.classList.add("category");
        thisCat.innerText = cat;
        thisCat.dataset.category = cat;
        $(".categories").append(thisCat);
    });
}

function initEvents() {
    // adds active class to selected category
    $(".categories").addEventListener("click", e => {
        if (e.target.matches(".category")) {
            $$(".category").forEach(btn => {
                btn.classList.remove("activeCategory");
            });
            e.target.classList.add("activeCategory");
        }
    });
}

adminInit();
