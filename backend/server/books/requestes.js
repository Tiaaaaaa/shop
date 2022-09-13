const booksFun = require("./operations")

/**
 * address for having a list of books,
 * if the "isbn" field is in the request the books will be filtered
 */
app.get('/books', (req, res) => {

    booksFun.isValid(req.query.book)

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