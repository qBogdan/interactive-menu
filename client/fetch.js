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
    fetch(API.READ.URL)
        .then(list => list.json())
        .then(r => {
            const recipes = r;
            const availableRecipes = recipes.filter(r => r.availability === true);
            const categories = [...new Set(availableRecipes.map(r => r.category))];
            menuInit(availableRecipes, categories);
        });
}

loadRecipes();
