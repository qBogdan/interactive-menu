// common functions
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
} // query selector all helper function, returns array of elements

const div = () => document.createElement("div"); // create div shortcut
let recipes;
