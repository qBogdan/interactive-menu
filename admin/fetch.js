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
demo = false;
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

    return fetch(API.CREATE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(recipe),
    });
}

function updateRecipe(recipe) {
    const method = API.UPDATE.METHOD;

    return fetch(API.UPDATE.URL, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: method === "GET" ? null : JSON.stringify(recipe),
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
    });
}

loadRecipes()
    .then(list => list.json())
    .then(r => {
        recipes = r;
        const categories = [...new Set(recipes.map(r => r.category))];
        adminInit(recipes, categories);
    });
