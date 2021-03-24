const card = {
    el: document.querySelector(".card.primary"),
    is: {
        hovered: false,
        dragged: false
    },
    pos: {
        x: 0
    }
}
const mousePos = {x: null, y: null};

const deck = {}

function setMousePos(e) {
    if(!card.is.dragged) return;

    // Bron Vermelden
    if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
        var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
        var touch = evt.touches[0] || evt.changedTouches[0];
        mousePos.x = touch.pageX - rect.left - (rect.width / 2);

    } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover'|| e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
        mousePos.x = e.clientX - rect.left - (rect.width / 2);
    }
}

let rect = card.el.getBoundingClientRect();
window.addEventListener("resize", _ => {
    rect = card.el.getBoundingClientRect()
});

// Bron toevoegen
function lerp(start, end, amt) { return (1-amt)*start+amt*end; }

card.el.addEventListener("mouseenter", _ => hoverCard(true));
card.el.addEventListener("mouseleave", _ => hoverCard(false));
document.addEventListener("mousedown", _ => { if(card.is.hovered) dragCard(); });
document.addEventListener("mouseup", _ => { dropCard() });

window.addEventListener('mousemove', setMousePos);
window.addEventListener('touchmove', setMousePos);
window.addEventListener('touchstart', setMousePos);
window.addEventListener("scroll", setMousePos);

function hoverCard(isHovered) {
    card.is.hovered = isHovered;
    if(isHovered) {
        card.el.classList.add("hovered");
    } else {
        card.el.classList.remove("hovered");
    }
}

function dragCard() {
    card.el.classList.add("dragged");
    card.is.dragged = true;
}

function dropCard() {
    card.is.dragged = false;
    card.el.classList.remove("dragged");
}

function render() {
    const cX = lerp(card.pos.x, mousePos.x, 0.075);

    card.pos.x = cX
    card.el.style.left = cX + "px";

    if(card.pos.x <= -150) {
        card.el.style.backgroundColor = "red";

        // card.el.remove();
        // card.el = document.querySelectorAll(".card")[0];
        // card.el.classList.add("primary");
        // card.pos.x = 0;

    } else if(card.pos.x >= 150) {
        card.el.style.backgroundColor = "green";
    } else {
        card.el.style.backgroundColor = "white";
    }

    requestAnimationFrame(render);
}
requestAnimationFrame(render);

// Quote Fetching
function setLoading(loading) {
    if(loading) {
        console.log("loading...");
        return;
    }

    // If loaded:
    console.log("Loaded!");
}

function somethingWentWrong(error) {
    console.log("Woops, something went wrong!", error);
}

async function fetchQuote() {
    const response = await fetch('https://api.quotable.io/random?maxLength=80');
    return await response.json();
}

function createCard(theQuote, theAuthor) {
    const card = document.createElement("div");
    card.classList.add("card");

    const quoteNode = document.createTextNode(theQuote);
    const authorNode = document.createTextNode(`- ${theAuthor}`);

    const header = document.createElement("div");
    header.classList.add("header");

    const footer = document.createElement("div");
    footer.classList.add("footer");

    header.appendChild(quoteNode);
    footer.appendChild(authorNode);

    card.appendChild(header);
    card.appendChild(footer);

    return card;
}

function addCard(card) {
    const deck = document.querySelector(".deck");
    deck.appendChild(card);
}

function insertQuote(quote) {
    console.log("quote: ", quote);

    const card = createCard(quote.content, quote.author);
    addCard(card);
}

async function newQuote() {
    setLoading(true);

    try {
        newQuote = await fetchQuote();
    } catch(error) {
        somethingWentWrong(error);
    }

    if(newQuote) {
        insertQuote(newQuote);
    }

    setLoading(false);
}

newQuote();
createCard();
