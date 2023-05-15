/**
 * get address for the valid books fetch.
 * if any information is passed the search will be filtered.
 */
app.get('/books/get-books', (req, res) => {

    let books = db.get("books").value();

    if (req.query.book) {
        books = books.filter(b => b.isbn.toString().includes(req.query.book));
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

    res.json(books);

});

app.get('/books/classes', (req, res) => {
    let books = db.get("books").value();

    let classes = [];

    books.forEach(element => {
        if (!classes.includes(element.section)) {
            classes.push(element.section);
        }
    });

    res.json(classes);

});

app.get('/books/subjects', (req, res) => {
    let books = db.get("books").value();

    let subjects = [];

    books.forEach(element => {
        if (!subjects.includes(element.subject)) {
            subjects.push(element.subject);
        }
    });

    res.json(subjects);

});