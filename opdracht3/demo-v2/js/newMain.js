const cards = [
    {
        "_id":"GS84RFhqTdbr",
        "content":"Remember that failure is an event, not a person.",
        "author":"Zig Ziglar"
    }
]

function createCardElement(theQuote, theAuthor) {
    console.log("Creating card...");

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

function addCardToDeck(deck, card) {
    deck.appendChild(card);
}

const card = createCardElement("Advice is like snow; the softer it falls the longer it dwells upon, and the deeper it sinks into the mind.", "Samuel Taylor Coleridge")
const deck = document.getElementById("deck");
addCardToDeck(deck, card);
