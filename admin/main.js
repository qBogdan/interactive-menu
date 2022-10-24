function adminInit(recipes, categories) {
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
    $(".categories").addEventListener("click", e => {
        if (e.target.matches(".category")) {
            $$(".category").forEach(btn => {
                btn.classList.remove("activeCategory");
            });
            e.targe.classList.add("activeCategory");
        }
    });
}

adminInit();
