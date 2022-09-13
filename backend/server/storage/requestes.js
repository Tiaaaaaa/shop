const bodyParser = require('body-parser')
const usersFun = require("../users/operations")
const storageFun = require("./operations")
const check = require("../checkData")

// create application/json parser
let jsonParser = bodyParser.json()

/**
 * address to get the list of books
 * deposied by a customer from the id code
 * 
 * @param {String} cf the id code
 */
app.get('/given-from-cf', (req, res) => {

    let cf = req.query.cf;

    if (!cf)
        res.status(400).send("cf mancante");

    if (!check.cf(cf))
        res.status(400).send("cf errato");

    let guest = usersFun.exist(cf);

    if(!guest) {
        guest = usersFun.addUser(cf);
    }

    storage = storageFun.getFromCf(cf);

    let qRes = [];

    storage.forEach(stored => {
        qRes.push(stored.book);
    });


    res.send(qRes);

});


/**
 * address to make the request to deposit
 * a book.
 * 
 * @param {Number} book the isbn of the book that is wanted to deposit
 * @param {String} seller the id code of the seller
 * @param {Boolean} state the state of usury of the book
 * 
 * @error 400 if the infos are not complete.

 */
app.put('/add-to-storage', jsonParser, (req, res) => {


    // Controlla se il codice fiscale è valido
    if (!check.cf(req.body.seller)) {
        res.status(400).send("codice fiscale inviato non valido");
        return;
    }

    // Definizione dello stato d'usura
    let state;

    if (req.body.state == 1) {
        state = true;
    } else {
        state = false;
    }

    try {
        storageFun.addToStorage(req.body.book, req.body.seller, req.body.state);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});

/**
 * address to make a request to search a list of books
 * using the isbn or the class in witch are adopted.
 * 
 * @param {Number} isbn the isbn of the book that is searched
 * @param {String} class the class in witch the book ar adopted
 * 
 * @error 400 if there are not infos.
 */
app.get('/search-in-storage', (req, res) => {

    let qRes;

    if (req.query.book) {
        qRes = db.get("storage").value().filter(s => s.book.isbn == req.query.isbn);
    } else if (req.query.class) {
        qRes = db.get("storage").value().filter(s => s.book.class == req.query.class);
    } else {
        res.status(400).send("inviare una richiesta idonea");
        return;
    }

    res.send(qRes);

});
