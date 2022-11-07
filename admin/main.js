let editId = false;
let base64string;
let recipes;
let filteredRecipes;

function adminInit(recipes, categories) {
    recipes = recipes;
    filteredRecipes = recipes;
    displayCategories(categories);
    addCategoryOptions(categories);
    displayRecipes(recipes);
    initEvents(recipes);
}

function displayCategories(categories) {
    // adauga butoane pentru fiecare categorie
    categories.forEach((cat) => {
        const thisCat = div();
        thisCat.classList.add("category");
        thisCat.innerText = cat;
        thisCat.dataset.category = cat;
        $(".categories").append(thisCat);
    });
}

function initEvents(recipes) {
    // adds active class to selected category
    $(".categories").addEventListener("click", (e) => {
        if (e.target.matches(".category")) {
            $$(".category").forEach((btn) => {
                btn.classList.remove("activeCategory");
            });
            e.target.classList.add("activeCategory");
            filterRecipes(e.target.dataset.category);
        }
    });

    $(".addNewRecipe").addEventListener("click", (e) => {
        //deschide formularul
        $(".formContainer").style.display = "flex";
        editId = false;
        $("#form").reset();
        $("#imgInput").style.backgroundImage = `url("Media/UI/uploadPhoto.svg")`;
        $(".delete").style.display = "none";
    });

    $(".close").addEventListener("click", (e) => {
        //inchide formularul
        e.preventDefault();
        $(".formContainer").style.display = "none";
    });

    $(".clear").addEventListener("click", (e) => {
        //reseteaza formularul
        e.preventDefault();
        $("#imgInput").style.backgroundImage = `url("Media/UI/uploadPhoto.svg")`;
        $("#form").reset();
    });

    $(".delete").addEventListener("click", (e) => {
        //sterge reteta
        confirmDelete(e);
    });

    $("main").addEventListener("click", (e) => {
        //deschide formular cu reteta selectata
        if (e.target.closest(".card")) {
            displayRecipe(e.target.closest(".card").dataset.id, recipes);
        }
    });

    $("#imgInput").addEventListener("change", useImage);

    $("#form").addEventListener("submit", submitForm);

    $("#search").addEventListener("input", (e) => {
        search(e.target.value);
    });

    $(".sort").addEventListener("click", (e) => {
        if (e.target.matches(".sortButton")) {
            sortRecipes(e.target.dataset.sort, e.target.dataset.value);
        }
    });
}

function sortRecipes(type, value) {
    filteredRecipes.sort((a, b) => {
        if (type === "name") {
            //sort bt
        }
    });
    displayRecipes;
    console.log(type, value);
}

function filterRecipes(filter) {
    if (filter === "all") {
        filteredRecipes = recipes;
    } else {
        filteredRecipes = recipes.filter((r) => r.category === filter);
    }
    displayRecipes();
}

function search(input) {
    if (input === "") {
        filterRecipes($(".activeCategory").dataset.category);
    } else {
        filteredRecipes = recipes.filter(
            (r) => r.name.toLowerCase().includes(input.toLowerCase()) || r.ingredients.toLowerCase().includes(input.toLowerCase())
        );
    }
    displayRecipes();
}

function confirmDelete(e) {
    e.preventDefault();
    $(".formContainer").style.display = "none";
    deleteRecipe(editId) // trimite request sa stearga reteta cu id-ul dat
        .then((res) => res.json())
        .then((r) => {
            if (r.success) {
                if (inLineChanges) {
                    recipes = recipes.filter((r) => r.id !== editId);
                    displayRecipes();
                } else {
                    refreshDisplay();
                }
            }
        });
}

function submitForm(e) {
    e.preventDefault();
    const thisRecipe = getInputObject(); // creez obiect nou cu informatiile din formular

    if (editId) {
        thisRecipe.id = editId;
        updateRecipe(thisRecipe)
            .then((res) => res.json())
            .then((r) => {
                if (r.success) {
                    if (inLineChanges) {
                        const update = recipes.find((r) => r.id === editId);
                        for (let key in update) {
                            update[key] = thisRecipe[key];
                        }
                        displayRecipes();
                    } else {
                        refreshDisplay();
                    }
                }
            });
    } else {
        const date = new Date();
        createRecipe(thisRecipe)
            .then((res) => res.json())
            .then((r) => {
                if (r.success) {
                    if (inLineChanges) {
                        thisRecipe.id = `demoID${date.getTime()}`;
                        recipes.push(thisRecipe);
                        displayRecipes();
                    } else {
                        refreshDisplay();
                    }
                }
            });
    }
    $(".formContainer").style.display = "none";
}

async function useImage(e) {
    const file = e.target.files[0];
    const base64string = await getBase64(file);
    e.target.style.backgroundImage = `url(${base64string})`;
}

function getBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        let base64string;
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.readAsDataURL(file);
    });
}

function cardConstructor(recipe) {
    // creaza structura html pentru carduri
    return `
    <div class="card" data-id="${recipe.id}">
        <div class="cardImage" style="background-image: url(${recipe.img === "" ? `Media/UI/logo.svg` : `${recipe.img}`})"></div>
        <h2>${recipe.name}</h2>
        <div class="weight">${recipe.weight} gr</div>
        <div class="price">${recipe.price} Lei</div>
        <div class="availability ${recipe.availability === true ? "avbTrue" : "avbFalse"}"></div>
    </div>
    `;
}

function displayRecipes() {
    // creaza structura html pentru fiecare reteta din lista si injecteaza finalul in DOM

    let recipesHtml = "";
    $("main").innerHTML = recipesHtml;
    filteredRecipes.forEach((r) => {
        recipesHtml += cardConstructor(r);
    });

    $("main").innerHTML = recipesHtml;
}

function displayRecipe(id) {
    // afiseaza formularul cu informatiile retetei
    const thisRecipe = recipes.find((r) => r.id === id); // gaseste reteta in array
    $(".delete").style.display = "block";
    editId = id;
    for (let key in thisRecipe) {
        // itereaza fiecare proprietate a obiectului
        if (key !== "id") {
            if (key === "img") {
                $(`#${key}Input`).style.backgroundImage = `url(${thisRecipe[key] === "" ? `Media/UI/logo.svg` : `${thisRecipe[key]}`}`;
            } else if (key === "availability") {
                $(`#${key}Input`).checked = thisRecipe[key];
            } else {
                $(`#${key}Input`).value = thisRecipe[key];
            }
        }
    }

    $(".formContainer").style.display = "flex"; // afiseaza formularul
}

function addCategoryOptions(categories) {
    // adauga optiunile de categorii din formularul de creare
    let categoryOptions;
    categories.forEach((cat) => {
        categoryOptions += `<option>${cat}</option>`;
    });
    $("#categoryInput").innerHTML = categoryOptions;
}

function getInputObject() {
    let newRecipe = {};

    $$(".formInput").forEach((input) => {
        if (input.name === "img") {
            newRecipe[input.name] = input.style.backgroundImage.length > 35 ? input.style.backgroundImage.match(/url\("(.*?)"\)/)[1] : "";
        } else if (input.name === "availability") {
            newRecipe[input.name] = input.checked;
        } else {
            newRecipe[input.name] = input.value;
        }
    });

    return newRecipe;
}

function refreshDisplay() {
    loadRecipes()
        .then((list) => list.json())
        .then((r) => {
            recipes = r;
            displayRecipes();
        });
}
