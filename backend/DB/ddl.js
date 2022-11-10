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
exports.User = class {
    constructor(cf, id) {
        this.cf = cf;
        
        if (id == undefined) {
            this.id = undefined;
        } else {
            this.id = id;
        }
    }
}

// Oggetto che definisce le entry del magazzino
exports.Storage = class {
    constructor(book, seller, buyDate, state, id) {
        this.book = book;
        this.buyDate = buyDate;
        this.seller = seller;
        this.state = state;
        this.id = id;
    }
}

exports.Sold = class{
    constructor(book, buyer, seller, sellDate){
        //this.id = id;
        this.book = book;
        this.buyer = buyer;
        this.seller = seller;
        this.sellDate = sellDate;
    }
}