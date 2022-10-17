let page = 0;
var container = document.querySelector("main");
var listener = SwipeListener(container);
function mainInitEvents() {
    createMenu();
    $$(".mainCard").forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.matches(".add")) {
                addItem(e);
            } else {
                expandCard(card);
            }
        });
    });

    $("main").addEventListener("swipe", (e) => {
        let directions = e.detail.directions;

        if (directions.left) {
            changeCategory("right");
        }

        if (directions.right) {
            changeCategory("left");
        }
    });

    $$(".smallCard").forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.matches(".add")) {
                addItem(e);
            }
        });
    });

    $(".categoryTab").addEventListener("click", (e) => {
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
    const categories = $$(".category");
    $(".categoryTitle").innerText = categories[index].dataset.name;
}

function expandCard(card) {
    if (card.matches(".mainCardExpanded")) {
        card.classList.remove("mainCardExpanded");
    } else {
        $$(".mainCard").forEach((card) => {
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

    order(recipes.find((r) => r.id === e.target.dataset.id));
}

function createMenu() {
    createCategories();
    recipes.map((r) => createRecipes(r));
    recipes.map((r) => createRecipes(r));
    //add recipes to each category
}

function createCategories() {
    categories.forEach((cat) => {
        const newCat = div();
        newCat.classList.add(cat, "category");
        newCat.dataset.name = cat;
        $(".categoryWrapper").append(newCat);
    });
}

function createRecipes(recipe) {
    if (recipe.availability) {
        let thisRecipe;
        if (recipe.category === "Bauturi" || recipe.category === "Garnituri") {
            thisRecipe = secondaryCardConstructor(recipe);
        } else {
            thisRecipe = mainCardConstructor(recipe);
        }
        $(`.${recipe.category}`).innerHTML += thisRecipe;
    }
}

const mainCardConstructor = (recipe) => {
    return `<div class="mainCard">
        <div class="picture"><img src="../Media/Pictures/${recipe.img}.jpg"></div>
        <div class="content">
            <h1>${recipe.name}</h1>
            ${
                recipe.category !== "Desert"
                    ? `<p class ="ingredients">
            <span>Ingredients:</span> <br />
            ${recipe.ingredients}
            </p>`
                    : ""
            }
            
            <div class="info">
                <div class="infoText">
                    <div class="pill">${recipe.price} Lei</div>
                        <div class="infoDetails">
                            <div class="pill">${recipe.eta} minute</div>
                            <div class="pill">${recipe.weight}gr</div>
                        </div>
                    </div>
                    <div class="add" data-id="${recipe.id}"></div>
                </div>
            </div>
         </div>`;
};

const secondaryCardConstructor = (recipe) => {
    return `
    <div class="smallCard">
        <div class="content">
            <h1>${recipe.name}</h1>
            <div class="info">
                <div class="infoText">
                    <div class="pill">${recipe.price} Lei</div>
                    <div class="infoDetails">
                        <div class="pill">${recipe.weight}gr</div>
                    </div>
                </div>
                <div class="add" data-id="${recipe.id}"></div>
            </div>
        </div>
    </div>`;
};
