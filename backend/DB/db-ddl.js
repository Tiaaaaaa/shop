// Oggetto che definisce i libri 
exports.book = {
    isbn: Number,
    subject: String,
    title: String,
    volume: String,
    publisher: String,
    price: Number,
    section: String,
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
exports.user = {
    cf: String,
    id: Number,
    constructor(cf) {
        this.cf = cf;
    }

}

// Oggetto che definisce le entry del magazzino
exports.storage = {
    book: this.book,
    seller: this.client,
    buyer: this.client,
    buyDate: Date,
    sellDate: Date,
    state: Boolean,
    constructor(book, seller, buyDate, state) {
        this.book = book;
        this.buyDate = buyDate;
        this.seller = seller;
        this.state = state;
        this.buyer = null;
        this.buyDate = null;
    },

    a: (a) => {console.log(a)}
}

