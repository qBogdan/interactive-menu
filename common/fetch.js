// common functions
function $(selector) {
    return document.querySelector(selector);
} // query selector helper function

function $$(selector) {
    return document.querySelectorAll(selector);
} // query selector all helper function, returns array of elements

const div = () => document.createElement("dic"); // create div shortcut

// common fetch and request js

let recipes;
const categories = ["Aperitive", "Pizza", "Preparate din Pui", "Preparate de Vita", "Garnituri", "Desert", "Bauturi"];
const alergens = ["lactoza", "gluten"];

const testRecipe = {
    id: "",
    name: "Pizza Quatro Staggioni",
    category: "Pizza",
    availability: true,
    weight: 450,
    price: 35,
    ingredients: ["salam", "mozzarela", "sos de rosii", "ciuperci"],
    img: "pizaQS",
};

function loadRecipes() {
    fetch("http://localhost:3000/recipes-json")
        .then(list => list.json())
        .then(r => {
            recipes = r;
            //testDisplay();
        });
}

function testDisplay() {
    $("body").innerHTML = "";
    recipes.forEach(element => {
        $("body").innerHTML += `${element.name} : ${element.id} <br>`;
    });
}

function createRecipe(name) {
    const newRecipe = { ...testRecipe };
    newRecipe.name = name;
    return fetch("http://localhost:3000/recipes-json/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
    });
}

function deleteRecipe(id) {
    return fetch("http://localhost:3000/recipes-json/delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
}

function updateRecipe(id, name) {
    const update = { ...testRecipe };
    update.id = id;
    update.name = name;
    return fetch("http://localhost:3000/recipes-json/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
    });
}

loadRecipes();
