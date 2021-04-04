import createElement from './createElement.js';
import render from "./render.js";
import mount from "./mount.js";
import diff from "./diff.js";

const card = count => createElement("div", {
        attributes: {
            id: "card",
            dataCount: count
        },
        children: [
            ...Array.from({ length: count}, (value, index) => createElement('p', {
                children: [
                    String(index)
                ]
            })),
            createElement("p", {
                children: [
                    String(count)
                ]
            })
        ]
    });

let count = 0;
let cardCreated = card(count);
let cardRendered = render(cardCreated);

let rootEl = mount(cardRendered, document.getElementById("app"));

setInterval(() => {
    count = Math.floor(Math.random() * 10);
    const newCardCreated = card(count);

    const patch = diff(cardCreated, newCardCreated);

    rootEl = patch(rootEl);

    cardCreated = newCardCreated;
}, 1000);
