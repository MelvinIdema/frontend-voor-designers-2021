class Quotes {

    async fetch() {
        const response = await fetch('https://api.quotable.io/random?maxLength=80');
        return await response.json();
    }
    
}

export default new Quotes();
