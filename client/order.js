let orderList = [];
let orderQty = 0;

function order(recipe) {
    addOrder(recipe);
    displayOrder();
}

function addOrder(recipe) {
    const orderedRecipe = { ...recipe }; // clonez obiectul primit
    if (orderList.findIndex(r => r.id === recipe.id) >= 0) {
        //verific daca obiectul este comandat, daca da, adaug +1 la cantitate
        orderList[orderList.findIndex(r => r.id === orderedRecipe.id)].qty++;
    } else {
        //daca obiectul nu este comandat, il adaug in adaug in lista si setez cantitate ca 1
        orderedRecipe.qty = 1;
        orderList.push(orderedRecipe);
    }
    orderQty++;
}

function displayOrder() {
    $(".mainCheck").innerHTML = "";
    orderList.map(r => ($(".mainCheck").innerHTML += orderCardConstructor(r)));

    displayTip();
}

function calculateTotal() {
    let total = 0;
    orderList.map(r => (total += r.qty * r.price));
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

function tipCardConstructor(percentage, totalTip) {
    return `
    <div class="tipCard">
        <div class="checkTitleTitle"> + ${percentage}% tip </div>
        <div class="checkPrice">${totalTip} Lei</div>
    </div>
    `;
}

function changeOrder(e) {
    // modifica cantitatea retei, iar daca e 0 o elimina din lista
    const thisRecipe = orderList.find(r => r.id === e.target.dataset.id);
    if (e.target.matches(".minusOrder")) {
        thisRecipe.qty--;
        orderQty--;
        if (thisRecipe.qty === 0) {
            orderList = orderList.filter(r => r.id !== thisRecipe.id);
        }
    } else if (e.target.matches(".plusOrder")) {
        thisRecipe.qty++;
        orderQty++;
    }
    displayOrder();
}

function addTip(e) {
    $$(".tipPercentage").forEach(tip => {
        tip.classList.remove("tipPercentageSelected");
    });
    e.target.classList.add("tipPercentageSelected");
    displayOrder();
}

function displayTip() {
    //calculeaza totalul, procentul bacsisului, le aduna si le afiseaza
    const percentage = $(".tipPercentageSelected").dataset.percentage;
    const total = calculateTotal();
    const totalTip = Math.floor((total * percentage) / 100);
    const totalPrice = total + totalTip;

    if (percentage > 0) $(".mainCheck").innerHTML += tipCardConstructor(percentage, totalTip);

    $(".totalValue").innerText = `${totalPrice} Lei`;
    $(".checkNumber").innerText = `${totalPrice} Lei`;
}
