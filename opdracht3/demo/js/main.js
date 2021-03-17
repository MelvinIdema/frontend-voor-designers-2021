const quoteContainer = document.querySelector(".quote-container");
const kbHint = document.querySelector(".kb-hint");
let pressedKey = null;
let theQuote = null;

function setLoading(loading) {
    if(loading) {
        quoteContainer.textContent = "Loading...";
        return console.log("Loading...");
    }

    // If loaded:
    console.log("Loaded!");
}

function somethingWentWrong(error) {
    console.log("Woops, something went wrong!", error);
}

function insertQuote(quote) {
    console.log("quote: ", quote);
    quoteContainer.textContent = `${quote.content} - ${quote.author}`;
}

async function fetchQuote() {
    const response = await fetch('http://api.quotable.io/random?maxLength=80');
    return await response.json();
}

async function newQuote() {
    setLoading(true);

    try {
        theQuote = await fetchQuote();
    } catch(error) {
        somethingWentWrong(error);
    }

    if(theQuote) {
        insertQuote(theQuote);
    }

    setLoading(false);
}

newQuote();

kbHint.addEventListener("mousedown", e => {
    kbHint.classList.add("pressed");
    newQuote();
})

kbHint.addEventListener("mouseup", e => {
    kbHint.classList.remove("pressed");
})

document.addEventListener("keydown", e => {
    if(e.which === 32 && pressedKey !== e.which) {
        pressedKey = 32;
        kbHint.classList.add("pressed");
        newQuote();
    }
})

document.addEventListener("keyup", e => {
    if(e.which === 32) {
        kbHint.classList.remove("pressed");
    }

    pressedKey = null;
})
