// common functions
function $(selector) {
    return document.querySelector(selector);
} // query selector helper function

function $$(selector) {
    return document.querySelectorAll(selector);
} // query selector all helper function, returns array of elements

const div = () => document.createElement("dic"); // create div shortcut

// common fetch and request js
