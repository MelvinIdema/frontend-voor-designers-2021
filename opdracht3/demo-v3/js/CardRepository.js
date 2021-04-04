class CardRepository {
    constructor({uuidGenerator}) {
        this.cards = [];
        this.generateUuid = uuidGenerator;
    }

    getById(id) {
        return this.cards.filter(card => card.id === id);
    }

    save({quote, author}) {
        const card = {
            id: this.generateUuid(),
            quote,
            author
        }

        this.cards.push(card);
        return card.id;
    }

    list() {
        return this.cards;
    }

    remove(id) {
        const card = this.cards.filter(card => card.id === id);
        const indexOfCard = this.cards.indexOf(card);
        this.cards.splice(indexOfCard, 1);
    }
}

export default CardRepository;
