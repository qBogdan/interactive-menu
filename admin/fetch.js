const API = {
    CREATE: {
        URL: "http://localhost:3000/recipes-json/create",
        METHOD: "POST",
    },
    READ: {
        URL: "http://localhost:3000/recipes-json",
        METHOD: "GET",
    },
    UPDATE: {
        URL: "http://localhost:3000/recipes-json/update",
        METHOD: "PUT",
    },
    DELETE: {
        URL: "http://localhost:3000/recipes-json/delete",
        METHOD: "DELETE",
    },
};

//const demo = location.host === "qbogdan.github.io" ? true : false;
demo = true;
const inLineChanges = demo;

if (demo) {
    API.READ.URL = "data/recipes.json";
    API.DELETE.URL = "data/delete.json";
    API.CREATE.URL = "data/create.json";
    API.UPDATE.URL = "data/update.json";

    API.DELETE.METHOD = "GET";
    API.CREATE.METHOD = "GET";
    API.UPDATE.METHOD = "GET";
}

function loadRecipes() {
    return fetch(API.READ.URL);
}

function createRecipe(recipe) {
    const method = API.CREATE.METHOD;
    const date = new Date();
    console.log(recipe);
    fetch(API.CREATE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(recipe),
    })
        .then((res) => res.json())
        .then((r) => {
            if (r.success) {
                if (inLineChanges) {
                    recipe.id = `demoID${date.getTime()}`;
                    recipes.push(recipe);
                    displayRecipes();
                } else {
                    loadRecipes()
                        .then((list) => list.json())
                        .then((r) => {
                            recipes = r;
                            displayRecipes();
                        });
                }
            }
        });
}

function updateRecipe(recipe) {
    const method = API.UPDATE.METHOD;

    fetch(API.UPDATE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(recipe),
    })
        .then((res) => res.json())
        .then((r) => {
            if (r.success) {
                if (inLineChanges) {
                    const update = recipes.find((r) => r.id === recipe.id);
                    for (let key in update) {
                        update[key] = recipe[key];
                    }
                    displayRecipes();
                } else {
                    loadRecipes()
                        .then((list) => list.json())
                        .then((r) => {
                            recipes = r;
                            displayRecipes();
                        });
                }
            }
        });
}

function deleteRecipe(delId) {
    const method = API.DELETE.METHOD;

    return fetch(API.DELETE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify({ id: delId }),
    })
        .then((res) => res.json())
        .then((r) => {
            console.log(r);
            if (r.success) {
                if (inLineChanges) {
                    recipes = recipes.filter((r) => r.id !== delId);
                    displayRecipes();
                } else {
                    loadRecipes()
                        .then((list) => list.json())
                        .then((r) => {
                            recipes = r;
                            displayRecipes();
                        });
                }
            }
        });
}

loadRecipes()
    .then((list) => list.json())
    .then((r) => {
        recipes = r;
        const categories = [...new Set(recipes.map((r) => r.category))];
        adminInit(recipes, categories);
    });
