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

let editId;
//const demo = location.host === "qbogdan.github.io" ? true : false;
demo = true;

const inLineChanges = demo;
if (demo) {
    API.READ.URL = "../data/recipes.json";
    API.DELETE.URL = "../data/delete.json";
    API.CREATE.URL = "../data/create.json";
    API.UPDATE.URL = "../data/update.json";

    API.DELETE.METHOD = "GET";
    API.CREATE.METHOD = "GET";
    API.UPDATE.METHOD = "GET";
}

function loadRecipes() {
    fetch(API.READ.URL)
        .then((list) => list.json())
        .then((r) => {
            recipes = r;
            //reload display
        });
}

function createRecipe(recipe) {
    const method = API.CREATE.METHOD;
    const date = new Date();

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
                } else {
                    loadRecipes();
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
                    recipes = recipes.map((r) => (r.id === editId ? recipe : r));
                    // reload display
                } else {
                    loadRecipes();
                }
            }
        });
}

function deleteRecipe(id) {
    const method = API.UPDATE.METHOD;

    return fetch(API.DELETE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify({ id }),
    })
        .then((res) => res.json())
        .then((r) => {
            if (r.success) {
                if (inLineChanges) {
                    recipes = recipes.filter((r) => r.id !== id);
                    // reload display
                } else {
                    loadRecipes();
                }
            }
        });
}
