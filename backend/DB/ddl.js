// Oggetto che definisce i libri 
exports.Book = {
    isbn: Number,
    subject: String,
    title: String,
    volume: String,
    publisher: String,
    price: Number,
    section: String,
    Book(isbn, subject, title, volume, publisher, price, section) {
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
exports.User = {
    cf: String,
    id: Number,
    User(cf) {
        this.cf = cf;
    }

}

// Oggetto che definisce le entry del magazzino
exports.Storage = {
    book: this.book,
    seller: this.client,
    buyer: this.client,
    buyDate: Date,
    sellDate: Date,
    state: Boolean,
    Storage (book, seller, buyDate, state) {
        this.book = book;
        this.buyDate = buyDate;
        this.seller = seller;
        this.state = state;
        this.buyer = null;
        this.buyDate = null;
    },

    a: (a) => {console.log(a)}
}

