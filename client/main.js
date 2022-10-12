let page = 0;
let touchStart,
    touchEnd = 0;
var container = document.querySelector("main");
var listener = SwipeListener(container);

function initEvents() {
    $$(".mainCard").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.matches(".add")) {
                addItem(e);
            } else {
                expandCard(card);
            }
        });
    });

    $("main").addEventListener("swipe", e => {
        let directions = e.detail.directions;

        if (directions.left) {
            changeCategory("right");
        }

        if (directions.right) {
            changeCategory("left");
        }
    });

    $$(".smallCard").forEach(card => {
        card.addEventListener("click", e => {
            if (e.target.matches(".add")) {
                addItem(e);
            }
        });
    });

    $(".categoryTab").addEventListener("click", e => {
        if (e.target.matches(".arrow")) {
            changeCategory(e.target.dataset.direction);
        }
    });

    $(".checkInfo").addEventListener("click", () => {
        showCheckout();
    });
}

function showCheckout() {
    console.log("check Please");
}

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

function checkSwipe() {
    if (touchEnd - touchStart > 50) {
        changeCategory("left");
    } else if (touchEnd - touchStart < 50) {
        changeCategory("right");
    }
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
        $$(".mainCard").forEach(card => {
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
