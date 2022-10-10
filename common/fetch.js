let demo, fetch_adress;

async function checkServer() {
    try {
        await fetch("http://localhost:3000/recipes-json");
        demo = false;
        fetch_adress = "http://localhost:3000/recipes-json";
        console.log("SERVER MODE");
    } catch (err) {
        demo = true;
        fetch_adress = "../data/recipes.json";
        console.log("DEMO MODE");
    }

    loadRecipes();
}

checkServer();

function loadRecipes() {
    fetch(fetch_adress)
        .then((list) => list.json())
        .then((r) => {
            recipes = r;
        });
}

function createRecipe(recipe) {
    if (demo) {
        const date = new Date();
        recipe.id = `demoID${date.getTime()}`;
        recipes.push(recipe);
    } else {
        return fetch("http://localhost:3000/recipes-json/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        });
    }
}

function testDisplay() {
    recipes.forEach((recipe) => {
        console.log(recipe.name, " - id: ", recipe.id);
    });
}

function deleteRecipe(id) {
    if (demo) {
        recipes = recipes.filter((recipe) => recipe.id !== id);
    } else {
        return fetch("http://localhost:3000/recipes-json/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        });
    }
}

function updateRecipe(recipe) {
    if (demo) {
        const update = recipes.find((r) => r.id === recipe.id);
        for (let key in update) {
            update[key] = recipe[key];
        }
    } else {
        return fetch("http://localhost:3000/recipes-json/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        });
    }
}
