// common functions
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
} // query selector all helper function, returns array of elements

const div = () => document.createElement("dic"); // create div shortcut

// common fetch and request js

let recipes;
const categories = [
    "Paste",
    "Pizza",
    "Preparate din Pui",
    "Preparate de Vita",
    "Garnituri",
    "Desert",
    "Bauturi",
];

const alergens = [
    {
        type: "lactoza",
        ingredients: ["branza", "cascaval", "mozzarella", "lapte"],
    },
    {
        type: "gluten",
        ingredients: ["blat", "paine"],
    },
];

const testRecipe = {
    name: "Pizza Quatro Staggioni",
    category: "Pizza",
    availability: true,
    eta: 25, // estimated time of arrival
    weight: 450,
    price: 35,
    ingredients: ["salam", "mozzarela", "sos de rosii", "ciuperci"],
    img: "pizzaQS",
};
