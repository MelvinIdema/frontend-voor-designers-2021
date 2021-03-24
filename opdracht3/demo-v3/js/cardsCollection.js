// https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


const cardsCollection = (function() {
    let cards = [];

    const add = function({quote, author}) {
        const card = {
            id: uuidv4(),
            quote,
            author
        }

        cards.push(card);
        return card.id;
    }

    const getAll = function() {
        return cards;
    }

    const getById = function(id) {
        return cards.filter(card => card.id === id);
    }

    const remove = function(id) {
        const card = cards.filter(card => card.id === id);
        const indexOfCard = cards.indexOf(card);
        cards.splice(indexOfCard, 1);
    }

    return {
        add,
        getAll,
        getById,
        remove
    }
})();

export default cardsCollection;
