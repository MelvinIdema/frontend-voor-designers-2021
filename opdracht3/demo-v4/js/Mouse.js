class Mouse {
    constructor() {
        this._pos = {
            x: 0,
            y: 0
        }

        this.addListeners();
    }

    // Bron Vermelden
    setMousePos(e, pos) {
        if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
            const evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
            const touch = evt.touches[0] || evt.changedTouches[0];
            pos.x = touch.pageX;
            pos.y = touch.pageY;

        } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover'|| e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
    }

    addListeners() {
        window.addEventListener('mousemove', e => this.setMousePos(e, this._pos));
        window.addEventListener('touchmove', e => this.setMousePos(e, this._pos));
        window.addEventListener('touchstart', e => this.setMousePos(e, this._pos));
        window.addEventListener("scroll", e => this.setMousePos(e, this._pos));
    }

    getPos() {
        return this._pos;
    }
}

export default Mouse;
