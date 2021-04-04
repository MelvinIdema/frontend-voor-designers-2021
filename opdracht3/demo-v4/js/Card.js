class Card {
    constructor({author, quote}) {
        this.author = author;
        this.quote = quote;
        // https://gist.github.com/gordonbrander/2230317
        this.id = '_' + Math.random().toString(36).substr(2, 9);

        this._elAppended = false;
        this._cardElement = false;
        this._isHovered = false;
        this._isDragged = false;
        this._isDropped = false;
        this._pos = {
            x: 0
        }
        this._boundingRect = false;
        this._isRemoved = false;
    }

    hoverCard(isHovered) {
        this._isHovered = isHovered;
        if(this._isHovered) {
            this._cardElement.classList.add("hovered");
        } else {
            this._cardElement.classList.remove("hovered");
        }
    }

    setBoundingRect() {
        if(this._elAppended) {
            this._boundingRect = this._cardElement.getBoundingClientRect();
            window.addEventListener("resize", _ => {
                this._boundingRect = this._cardElement.getBoundingClientRect()
            });
        }
    }

    getBoundingRect() {
        return this._boundingRect;
    }

    isDragged() {
        return this._isDragged;
    }

    dragCard() {
        this._isDragged = true;
        this._cardElement.classList.add("dragged");
    }

    dropCard() {
        this._isDragged = false;
        this._isDropped = true;
        this._cardElement.classList.remove("dragged");
    }

    addListeners() {
        this._cardElement.addEventListener("mouseenter", _ => this.hoverCard(true));
        this._cardElement.addEventListener("mouseleave", _ => this.hoverCard(false));
        document.addEventListener("mousedown", _ => { if(this._isHovered) this.dragCard(); });
        document.addEventListener("mouseup", _ => { this.dropCard() });
    }

    _toHtml(html) {
        const parser = new DOMParser();
        const tree = parser.parseFromString(html, 'text/html');
        return tree.querySelector("body > *");
    }

    appendTo(container) {
        this._cardElement = this._toHtml(`
            <div class="card" id="${this.id}">
                <div class="header">${this.quote}</div>
                <div class="footer">- ${this.author}</div>
            </div>
        `);

        if(container.childNodes.length === 0) this.makePrimary();

        container.appendChild(this._cardElement);
        this._elAppended = true;
        this.addListeners();
        this.setBoundingRect();
    }

    makePrimary() {
        this._cardElement.classList.add("primary");
    }

    setAuthor(author) {
        this.author = author;
        if(this._elAppended) {
            this._cardElement.childNodes[3].textContent = '- ' + this.author;
        }
    }

    setQuote(quote) {
        this.quote = quote;
        if(this._elAppended) {
            this._cardElement.childNodes[1].textContent = this.quote;
        }
    }

    moveElement() {
        this._cardElement.style.left = this._pos.x + "px";
        this._cardElement.style.top = this._pos.y + "px";
    }

    getPos() {
        return this._pos;
    }

    getIsRemoved() {
        return this._isRemoved;
    }

    getIsDropped() {
        return this._isDropped;
    }

    moveTo({x, y}) {
        this._pos.x = x;
        this._pos.y = y;
        this.moveElement();
    }

    setStyle(styleObject) {
        Object.keys(styleObject).forEach(entry => {
            this._cardElement.style[entry] = styleObject[entry];
        })
    }

    remove() {
        this._isRemoved = true;
        this._cardElement.remove();
        console.log("removed card");
    }
}

export default Card;
