const { isValid, getCover } = require("./operations");
const path = require("path");

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

app.get('/books/get-cover', (req, res) => {
    if (!req.query.isbn || !isValid(req.query.isbn)) res.status(400).send("Bad request, isbn not provided or not valid");

    var infos;

    try {
        infos = getCover(req.query.isbn);
        stream = infos.stream;
        stats = infos.stats;
    } catch (error) {
        console.log(error);
        res.status(404).send(error.toString());
        return;
    }

    res.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stats.size
    });

    stream.pipe(res);

});