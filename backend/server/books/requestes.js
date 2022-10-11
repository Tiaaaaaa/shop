const booksFun = require("./operations")

/**
 * address for having a list of books.
 * if any information is passed the search will be filtered.
 */
app.get('/books/get-books', (req, res) => {

    let books = db.get("books").value();

    if (req.query.book) {
        try {
            booksFun.isValid(req.query.book)
        } catch (error) {
            res.status(400).send(error);
            return;
        }

        books = books.filter(b => b.isbn == req.query.book);
    }

    if (req.query.section) {
        books = books.filter(b => b.section == req.query.section);
    }

    if (req.query.subject) {
        books = books.filter(b => b.subject == req.query.subject);
    }

    if (books.length == 0) {
        res.status(404).send("Libro non presente");
        return;
    }

    res.send(books);

});

app.get('/books/classes', (req, res) => {
    let books = db.get("books").value();

    let classes = [];

    books.forEach(element => {
        if (!classes.includes(element.section)) {
            classes.push(element.section);
        }
    });

    res.send(classes);

});