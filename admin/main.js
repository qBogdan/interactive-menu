let editId;
let base64string;

function adminInit(recipes, categories) {
    displayCategories(categories);
    addCategoryOptions(categories);
    displayRecipes(recipes);
    initEvents(recipes);
}

function displayCategories(categories, recipes) {
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
        }
    });

    $(".addNewRecipe").addEventListener("click", (e) => {
        $(".formContainer").style.display = "flex";
        editId = false;
        $("#form").reset();
        $("#imgInput").style.backgroundImage = `none`;
        $(".delete").style.display = "none";
    });

    $(".close").addEventListener("click", (e) => {
        $(".formContainer").style.display = "none";
    });

    $("main").addEventListener("click", (e) => {
        if (e.target.closest(".card")) {
            displayRecipe(e.target.closest(".card").dataset.id, recipes);
        }
    });

    $("#imgInput").addEventListener("change", useImage);

    $("#form").addEventListener("submit", submintForm);
}

function submintForm(e) {
    e.preventDefault();
    if (editId) {
        console.log("will edit object");
    } else {
        console.log("will create new Object");
    }
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
        <img src="${recipe.img === "" ? `Media/UI/logo.svg` : `${recipe.img}`}">
        <h2>${recipe.name}</h2>
        <div class="weight">${recipe.weight} gr</div>
        <div class="price">${recipe.price} Lei</div>
        <div class="availability ${recipe.availability === true ? "avbTrue" : "avbFalse"}"></div>
    </div>
    `;
}

function displayRecipes(recipes) {
    // creaza structura html pentru fiecare reteta din lista si injecteaza finalul in DOM
    let recipesHtml = "";
    $("main").innerHTML = recipesHtml;
    recipes.forEach((r) => {
        recipesHtml += cardConstructor(r);
    });

    $("main").innerHTML = recipesHtml;
}

function displayRecipe(id, recipes) {
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

/*<script>
      var loadFile = function (event) {
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(event.target.files[0]);
      };
    </script>
    
    
 
async function createRecipe(baseRecipe) {
  const recipe = {...baseRecipe, image: await getBase64(YOURFILE)};
    const method = API.CREATE.METHOD;
    const date = new Date();

    fetch(API.CREATE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(recipe),
    })
        .then(res => res.json())
        .then(r => {
            if (r.success) {
                if (inLineChanges) {
                    recipe.id = `demoID${date.getTime()}`;
                    recipes.push(recipe);
                    //reload display
                    console.log(recipes);
                } else {
                    loadRecipes();
                }
            }
        });
}*/
