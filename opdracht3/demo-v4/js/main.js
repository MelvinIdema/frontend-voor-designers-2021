import Card from "./Card.js";

import Mouse from "./Mouse.js";
const mouse = new Mouse();

import quotes from "./Quotes.js";
const cards = [];

import { lerp } from "./helpers.js";

const container = document.querySelector(".deck");

async function newQuote() {
    const newQuote = await quotes.fetch();
    const card = new Card({
        quote: newQuote.content,
        author: newQuote.author
    })
    card.appendTo(container);
    cards.push(card);
    return true;
}

let relativeMousePosX = 0;
function render() {
    const primaryCard = cards[0];
    console.log(primaryCard);
    if(!primaryCard) return;

    if(primaryCard.isDragged()) {
        relativeMousePosX = mouse.getPos().x - primaryCard.getBoundingRect().left - (primaryCard.getBoundingRect().width / 2);
    }
    const cX = lerp(primaryCard.getPos().x, relativeMousePosX, 0.075);
    primaryCard.moveTo({ x: cX, y: 0});

    if(primaryCard.getPos().x <= -150 && !primaryCard.getIsRemoved()) {
        primaryCard.setStyle({backgroundColor: 'red'})

        if(primaryCard.getIsDropped() && !primaryCard.isDragged()) {
            relativeMousePosX = 0;
            primaryCard.remove();
            cards.shift();
            cards[0].makePrimary();
            newQuote();
        }

    } else if(primaryCard.getPos().x >= 150) {
        primaryCard.setStyle({backgroundColor: 'green'})

        if(primaryCard.getIsDropped() && !primaryCard.isDragged()) {
            relativeMousePosX = 0;
            primaryCard.remove();
            cards.shift();
            cards[0].makePrimary();
            newQuote();
        }

    } else {
        primaryCard.setStyle({backgroundColor: 'white'})
    }

    requestAnimationFrame(render);
}

newQuote();
newQuote();
newQuote().then(_ => {
    render();
});
