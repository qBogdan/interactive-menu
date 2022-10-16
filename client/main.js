let page = 0;
let touchStart,
    touchEnd = 0;
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
}

function showCheckout() {
    console.log("check Please");
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
}

function createMenu() {
    createCategories();
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
    let thisRecipe;
    if (recipe.category === "Bauturi" || recipe.category === "Garnituri") {
        thisRecipe = secondaryCardConstructor(recipe);
    } else {
        thisRecipe = mainCardConstructor(recipe);
    }
    $(`.${recipe.category}`).innerHTML += thisRecipe;
}

const mainCardConstructor = (recipe) => {
    return `<div class="mainCard">
        <div class="picture"><img src="../Media/Pictures/${recipe.img}.jpg"></div>
        <div class="content">
            <h1>${recipe.name}</h1>
        </div>
    </div>`;
};

const secondaryCardConstructor = (recipe) => {
    return `<div> </div>`;
};

/*
                    <!-- <div class="mainCard">
                            <div class="picture"></div>
                            <div class="content">
                                <h1>Pizza Quattro Staggioni</h1>
                                <p class="ingredients">
                                    <span>Ingredients:</span> <br />
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                    Adipisci odit tempore sint similique expedita nesciunt,
                                    quibusdam reiciendis cupiditate, consectetur autem cum sit
                                    consequuntur dolor illum, ex inventore labore corporis
                                    explicabo?
                                </p>
                                <div class="info">
                                    <div class="infoText">
                                        <div class="price center">35 Lei</div>
                                        <div class="infoDetails">
                                            <div class="eta center">25 minutes</div>
                                            <div class="weight center">450gr</div>
                                        </div>
                                    </div>
                                    <div class="add"></div>
                                </div>
                            </div>
                        </div> -->

                    <!-- <div class="smallCard">
                            <div class="content">
                                <h1>Pina Colada</h1>
                                <div class="info">
                                    <div class="infoText">
                                        <div class="price center">35 Lei</div>
                                        <div class="infoDetails">
                                            <div class="weight center">450gr</div>
                                        </div>
                                    </div>
                                    <div class="add"></div>
                                </div>
                            </div>
                        </div> -->*/
