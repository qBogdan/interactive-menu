let page = 0;
const container = document.querySelector("main");
const listener = SwipeListener(container);

function menuInit(recipes) {
    filterMenu(recipes);
    createMenu(filterMenu(recipes), [...new Set(recipes.map(r => r.category))]);
    initEvents();
}

function filterMenu(recipes) {
    let menuRecipes = {};
    let categories = [...new Set(recipes.map(r => r.category))];
    categories.forEach(ct => {
        menuRecipes[ct] = recipes.filter(r => r.category === ct);
    });
    return menuRecipes;
}

function initEvents() {
    $$(".mainCard").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.matches(".add")) {
                addItem(e);
            } else {
                expandCard(card);
            }
        });
    });

    $("main").addEventListener("swipe", e => {
        let directions = e.detail.directions;

        if (directions.left) {
            changeCategory("right");
        }

        if (directions.right) {
            changeCategory("left");
        }
    });

    $$(".smallCard").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.matches(".add")) {
                addItem(e);
            }
        });
    });

    $(".categoryTab").addEventListener("click", e => {
        if (e.target.matches(".arrow")) {
            changeCategory(e.target.dataset.direction);
        }
    });

    $(".checkInfo").addEventListener("click", () => {
        showCheckout();
    });

    $(".closeCheck").addEventListener("click", () => {
        $(".checkWindow").classList.add("checkWindowHidden");
    });
}

function showCheckout() {
    $(".checkWindow").classList.remove("checkWindowHidden");
}

function changeCategory(direction) {
    if (direction === "left" && page < 0) {
        page++;
        $(".categoryWrapper").style.left = `${0 + page * 100}%`;
    } else if (direction === "right" && page > -$$(".category").length + 1) {
        page--;
        $(".categoryWrapper").style.left = `${0 + page * 100}%`;
    }

    changeCategoryTitle();
}

function checkSwipe() {
    if (touchEnd - touchStart > 50) {
        changeCategory("left");
    } else if (touchEnd - touchStart < 50) {
        changeCategory("right");
    }
}

function changeCategoryTitle() {
    const index = Math.abs(page);
    const categoryTabs = $$(".category");
    $(".categoryTitle").innerText = categoryTabs[index].dataset.name;
}

function expandCard(card) {
    if (card.matches(".mainCardExpanded")) {
        card.classList.remove("mainCardExpanded");
    } else {
        $$(".mainCard").forEach(card => {
            card.classList.remove("mainCardExpanded");
        });
        card.classList.toggle("mainCardExpanded");
        card.scrollIntoView({ block: "center", behavior: "smooth" });
    }
}

function addItem(e) {
    e.target.style.transition = "none";
    e.target.style.transform = "rotate(0deg)";

    setTimeout(() => {
        e.target.style.transition = "transform .2s ease-in";
        e.target.style.transform = "rotate(90deg)";
    }, 100);

    order(recipes.find(r => r.id === e.target.dataset.id));
}

function createMenu(recipes, categories) {
    createCategories(categories);
    addRecipes(recipes, categories);
    addRecipes(recipes, categories);
}

function createCategories(categories) {
    categories.forEach(cat => {
        const newCat = div();
        newCat.classList.add(cat, "category");
        newCat.dataset.name = cat;
        $(".categoryWrapper").append(newCat);
    });
}

function addRecipes(recipes, categories) {
    categories.forEach(cat => {
        let htmlElements = "";
        recipes[cat].forEach(r => {
            htmlElements += mainCardConstructor(r);
        });
        $(`.${cat}`).innerHTML += htmlElements;
    });
}

const mainCardConstructor = recipe => {
    return `
<div class="mainCard">
    ${recipe.img === "" ? "" : `<div class="picture"><img src="../Media/Pictures/${recipe.img}.jpg"></div>`}
    <div class="content">
        <h1>${recipe.name}</h1>
        ${
            recipe.ingredients === ""
                ? ""
                : `<p class ="ingredients">
                    <span>Ingredients:</span> <br />
                    ${recipe.ingredients}
                </p>`
        }
        <div class="info">
            <div class="infoText">
                <div class="pill">${recipe.price} Lei</div>
                    <div class="infoDetails">
                        ${recipe.eta === 0 ? "" : `<div class="pill">${recipe.eta} minute</div>`} 
                        <div class="pill">${recipe.weight}gr</div>
                    </div>
                </div>
                <div class="add" data-id="${recipe.id}"></div>
            </div>
        </div>
</div>`;
};
