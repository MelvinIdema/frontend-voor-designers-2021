class DomInterface {
    constructor(container) {
        this.container = container;
        this.tree = {}
    }

    toHtml(html) {
        const parser = new DOMParser();
        const tree = parser.parseFromString(html, 'text/html');
        return tree.querySelector("body > *");
    }

    createCardElement(card) {
        const cardElement = this.toHtml(`
            <div class="card" data-id="${card.id}">
                <div class="header">${card.quote}</div>
                <div class="footer">- ${card.author}</div>
            </div>
        `);

        this.addCardToContainer(cardElement);
    }

    addCardToContainer(card) {
        this.container.appendChild(card);
    }
}

export default DomInterface;
