let orderList = [];
let orderQty = 0;

function order(recipe) {
    addOrder(recipe);
    displayOrder(recipe);
}

function addOrder(recipe) {
    const orderedRecipe = { ...recipe };
    if (orderList.findIndex((r) => r.id === recipe.id) >= 0) {
        orderList[orderList.findIndex((r) => r.id === orderedRecipe.id)].qty++;
    } else {
        orderedRecipe.qty = 1;
        orderList.push(orderedRecipe);
    }
    orderQty++;
    $(".checkNumber").innerText = orderQty;
}

function displayOrder() {
    $(".mainCheck").innerHTML = "";
    orderList.map((r) => ($(".mainCheck").innerHTML += orderCardConstructor(r)));
    $(".totalValue").innerText = `${calculateTotal()} Lei`;
}

function calculateTotal() {
    let total = 0;
    orderList.map((r) => (total += r.qty * r.price));
    return total;
}
function orderCardConstructor(recipe) {
    return `
    <div class="checkCard">
        <div class="checkTitle">${recipe.name}</div>
        <div class="checkValue">${recipe.qty}</div>
        <div class="checkPrice">${recipe.qty * recipe.price}Lei</div>
    </div>
    `;
}
