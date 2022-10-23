function adminInit(recipes, categories) {
    displayCategories(categories);
}

function displayCategories(categories) {
    categories.forEach(cat => {
        const thisCat = div();
        thisCat.classList.add("category");
        thisCat.innerText = cat;
        thisCat.dataset.category = cat;
        $(".categories").append(thisCat);
    });
}

adminInit();
