function initEvents() {
    $$(".mainCard").forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.matches(".add")) {
                addItem(e);
            } else {
                expandCard(card);
            }
        });
    });

    $$(".smallCard").forEach((card) => {
        card.addEventListener("click", (e) => {
            if (e.target.matches(".add")) {
                addItem(e);
            }
        });
    });

    $(".categoryTab").addEventListener("click", (e) => {
        if (e.target.matches(".arrow")) {
            changeCategory(e.target.dataset.direction);
        }
    });
}

let page = 0;

function changeCategory(direction) {
    if (direction === "left" && page < 0) {
        page++;
        $(".categoryWrapper").style.left = `${0 + page * 100}%`;
    } else if (direction === "right" && page > -$$(".category").length + 1) {
        page--;
        $(".categoryWrapper").style.left = `${0 + page * 100}%`;
    }

    changeCategoryTitle();
}

function changeCategoryTitle() {
    const index = Math.abs(page);
    const categories = $$(".category");
    $(".categoryTitle").innerText = categories[index].dataset.name;
}

function expandCard(card) {
    if (card.matches(".mainCardExpanded")) {
        card.classList.remove("mainCardExpanded");
    } else {
        $$(".mainCard").forEach((card) => {
            card.classList.remove("mainCardExpanded");
        });
        card.classList.toggle("mainCardExpanded");
        card.scrollIntoView({ block: "center", behavior: "smooth" });
    }
}

function addItem(e) {
    e.target.style.transition = "none";
    e.target.style.transform = "rotate(0deg)";

    setTimeout(() => {
        e.target.style.transition = "transform .2s ease-in";
        e.target.style.transform = "rotate(90deg)";
    }, 100);
}

initEvents();
