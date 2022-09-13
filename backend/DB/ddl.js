// Oggetto che definisce i libri 
exports.Book = class {
    constructor(isbn, subject, title, volume, publisher, price, section) {
        this.isbn = isbn;
        this.subject = subject;
        this.title = title;
        this.volume = volume;
        this.publisher = publisher;
        this.price = price;
        this.section = section;   
    }
}

// Oggetto che definisce i clienti
exports.User = class{
    constructor(cf) {
        this.cf = cf;
        this.id = undefined; 
    }
}

// Oggetto che definisce le entry del magazzino
exports.Storage =  class{
    constructor(book, seller, buyDate, state) {
        this.book = book;
        this.buyDate = buyDate;
        this.seller = seller;
        this.state = state;
        this.buyer = null;
        this.sellDate = null;
    }
}

