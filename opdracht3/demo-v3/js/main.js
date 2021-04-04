import { uuidv4 } from "./helpers.js";

import DomInterface from "./DomInterface.js";
const container = document.getElementById("app");
const domInterface = new DomInterface(container);

import CardRepository from "./CardRepository.js";
const cardRepository = new CardRepository({ uuidGenerator: uuidv4 });

cardRepository.save({
    quote: "Remember that failure is an event, not a person.",
    author: "Zig Ziglar"
});

cardRepository.save({
    quote: "Advice is like snow; the softer it falls the longer it dwells upon, and the deeper it sinks into the mind.",
    author: "Samuel Taylor Coleridge"
})

cardRepository.list().forEach(card => {
    domInterface.createCardElement(card);
})
