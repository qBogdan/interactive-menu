// common functions
function $(selector) {
    return document.querySelector(selector);
} // query selector helper function

function $$(selector) {
    return document.querySelectorAll(selector);
} // query selector all helper function, returns array of elements

const div = () => document.createElement("dic"); // create div shortcut

// common fetch and request js

let recipes, filteredRecipes;

function loadRecipes() {
    fetch("http://localhost:3000/recipes-json")
        .then((list) => list.json())
        .then((r) => {
            recipes = r;
            testDisplay();
        });
}

function testDisplay() {
    recipes.forEach((element) => {
        $("body").innerText += element.name;
    });
}

function createRecipe() {
    return fetch("http://localhost:3000/recipes-json/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: "",
            name: "Pizza ciuperci",
            weight: 410,
            price: 37,
            ingredients: "salam, mozzarela, sos de rosii, ton",
            alergens: "gluten, lactoza",
            instructions:
                "Lorem ex nulla culpa ad do reprehenderit. Enim Lorem incididunt exercitation ex ut adipisicing aliqua commodo. Reprehenderit sunt ipsum laboris eiusmod ullamco proident tempor quis exercitation anim cillum nostrud occaecat reprehenderit. Ex Lorem est enim laboris reprehenderit mollit cupidatat sint exercitation non non eiusmod cupidatat amet. Magna nisi irure nostrud anim occaecat enim eu aute laborum laborum.",
        }),
    });
}

loadRecipes();

/*


function loadTeams() {
    fetch("http://localhost:3000/teams-json")
        .then((list) => list.json())
        .then((teams) => updateTable(teams));
}

function getTeamHtml(team, index) {
    return `
    <tr>
        <td>${team.promotion}</td>
        <td> ${team.members}</td>
        <td> ${team.name}</td>
        <td><a href="${team.url}">Visit </a></td>
        <td>
            <div class="buttonCell">
                <div data-index="${index}" class="edit"></div>
                <div data-index="${index}" class="delete"></div>
            </div>                      
        </td>
    </tr>
    `;
}

function updateTable(teams) {
    const teamsHTML = teams.map((team, index) => getTeamHtml(team, index));

    $(".tableBody table tbody").innerHTML = teamsHTML.join("");
}

function createTeamRequest(team) {
    return fetch("http://localhost:3000/teams-json/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(team),
    });
}

function submitForm(e) {
    e.preventDefault();

    const team = {
        promotion: "",
        members: "",
        name: "",
        url: "",
    };

    for (let key in team) {
        team[key] = $(`input[name=${key}]`).value;
    }

    createTeamRequest(team)
        .then((r) => r.json())
        .then((status) => {
            console.log(status);
            if (status.success) {
                //location.reload();
                loadTeams();
            }
        });
}

function initEvents() {
    $("#editForm").addEventListener("submit", submitForm);
}

loadTeams();
initEvents();
*/
