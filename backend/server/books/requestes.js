const dbMan = require("../../DB/management")

/**
 * manda una lista di libri.
 * nel caso in cui sia presente nella richiesta 
 * un isbn, allora si eseguirà la ricerca di quel libro,
 * altrimenti verranno mandati tutti quanti quelli 
 * adottati. 
 */
app.get('/books', (req, res) => {

    dbMan.searchBook(req.query.book)

    let books = db.get("books").value();

    if (req.query.book) {
        let filBooks = books.filter(b => b.isbn == req.query.book);

        if (filBooks.length == 0) {
            res.status(404).send("Libro non presente");
            return;
        }

        res.send(filBooks);

    } else {
        res.send(books);
    }

});