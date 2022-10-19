let orderList = [];
let orderQty = 0;

function order(recipe) {
    addOrder(recipe);
    displayOrder();
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
}

function displayOrder() {
    $(".mainCheck").innerHTML = "";
    orderList.map((r) => ($(".mainCheck").innerHTML += orderCardConstructor(r)));
    $(".totalValue").innerText = `${calculateTotal()} Lei`;
    $(".checkNumber").innerText = `${calculateTotal()} Lei`;
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
        <div class="checkWrapper">
        <div class="minusOrder" data-id="${recipe.id}"></div>
        <div class="checkValue">${recipe.qty}</div>
        <div class="plusOrder" data-id="${recipe.id}"></div>
            <div class="checkPrice">${recipe.qty * recipe.price}Lei</div>
        </div>
    </div>
    `;
}

function changeOrder(e) {
    const thisRecipe = orderList.find((r) => r.id === e.target.dataset.id);
    if (e.target.matches(".minusOrder")) {
        thisRecipe.qty--;
        orderQty--;
        if (thisRecipe.qty === 0) {
            orderList = orderList.filter((r) => r.id !== thisRecipe.id);
        }
    } else if (e.target.matches(".plusOrder")) {
        thisRecipe.qty++;
        orderQty++;
    }
    displayOrder();
}

function addTip(percent) {
    console.log(tip);
}
