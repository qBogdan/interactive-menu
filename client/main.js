$$(".mainCard").forEach((card) => {
    card.addEventListener("click", (e) => {
        if (e.target.matches(".add")) {
            addItem(e);
        } else {
            expandCard(card);
        }
    });
});

function expandCard(card) {
    $$(".mainCard").forEach((card) => {
        card.classList.remove("mainCardExpanded");
    });
    card.classList.toggle("mainCardExpanded");
    card.scrollIntoView({ block: "center", behavior: "smooth" });
}

function addItem(e) {
    console.log("itemAdded");

    e.target.style.transition = "none";
    e.target.style.transform = "rotate(0deg)";

    setTimeout(() => {
        e.target.style.transition = "transform .2s ease-in";
        e.target.style.transform = "rotate(90deg)";
    }, 100);
}
