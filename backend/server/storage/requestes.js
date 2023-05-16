const bodyParser = require('body-parser')
const usersFun = require("../users/operations")
const storageFun = require("./operations")
const check = require("../checkData")
const recFun = require("../receipts/operations")

// create application/json parser
let jsonParser = bodyParser.json()

/**
 * request address to get the list of books
 * deposied by a customer from the id code
 * 
 * @param {String} id the id code
 */
app.get('/storage/given-from-id', (req, res) => {

    let id = req.query.id;

    if (!id)
        res.status(400).send("id mancante");

    if (!check.cf(id))
        res.status(400).send("id errato");

    let guest = usersFun.exist(id);

    if (!guest) {
        guest = usersFun.addUser(id);
    }

    storage = storageFun.getFromId(id);

    let qRes = [];

    storage.forEach(stored => {
        qRes.push(stored.book);
    });


    res.json(qRes);

});


/**
 * request address to get the list of books
 * bougth by a customer from the id code
 * 
 * @param {String} id the id code
 */
app.get('/storage/bougth-from-id', (req, res) => {

    let id = req.query.id;

    if (!id) {
        res.status(400).send("id mancante");
        return;
    }

    if (!check.cf(id)) {
        res.status(400).send("cf errato");
        return;

    }
    let guest = usersFun.exist(id);

    if (!guest) {
        res.status(404).send("Utente richiesto non trovato");
        return;
    }

    bougth = storageFun.bougthFromId(id);

    let qRes = [];

    bougth.forEach(book => {
        qRes.push(book.book);
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
 * @error 500 if the server can't add the books in the storage.
 */
app.put('/storage/add-to-storage', jsonParser, (req, res) => {

    // Controlla se il codice fiscale è valido
    if (!check.cf(req.body.seller)) {
        res.status(400).send("codice fiscale inviato non valido: " + req.body.seller + " " + req.body.book);
        return;
    }

    try {
        storageFun.addToStorage(req.body.book, req.body.seller, req.body.state);
        res.status(200).send("book added");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }

});

/**
 * address to make a request to search a list of books
 * using the isbn or the class in witch are adopted.
 * 
 * @param {Number} isbn the isbn of the book that is searched
 * @param {String} class the class in witch the book ar adopted
 * 
 * @error 404 if there are not infos.
 */
app.get('/storage/search-in-storage', (req, res) => {

    let inStorage = db.get("storage").value();
    if (req.query.book) {
        try {
            inStorageFun.isValid(req.query.book)
        } catch (error) {
            res.status(400).send(error);
            return;
        }

        inStorage = inStorage.filter(b => b.book.isbn.toString().includes(req.query.book));
    }

    if (req.query.section) {
        inStorage = inStorage.filter(b => b.book.section.toString().includes(req.query.section));
    }

    if (req.query.title) {
        inStorage = inStorage.filter(b => b.book.title.toString().includes(req.query.title));
    }

    if (req.query.subject) {
        inStorage = inStorage.filter(b => b.book.subject.toString().includes(req.query.subject));
    }

    if (req.query.inSale) {
        inStorage = inStorage.filter(b => b.buyer == null);
        inStorage = inStorage.filter(b => b.seller.cf != req.query.seller);
    }

    if (inStorage.length == 0) {
        res.status(404).send("Nessun libro presente");
        return;
    }

    inStorage = inStorage.filter(b => !b.stashed)

    res.send(inStorage);

});

app.put('/storage/stash-book', jsonParser, (req, res) => {
    data = req.body;

    if (!data.id) res.status(400).send("not well formed request");

    try {
        storageFun.stash(data.id)
    } catch (error) {
        res.status(400).send(err);
    }

    res.status(200).send();

});

app.put('/storage/unstash-book', jsonParser, (req, res) => {
    data = req.body;


    if (!data.id) res.status(400).send("not well formed request");

    try {
        storageFun.unstash(data.id)
    } catch (error) {
        res.status(400).send(err);
    }

    res.status(200).send();

});

app.put('/storage/buy', jsonParser, (req, res) => {

    data = req.body;

    buyer = data.pop();

    data.forEach(element => {
        data.book.price += Number(element.price);
        storageFun.buy(buyer, element.id);
    });

    recFun.create(data, buyer);

    res.status(200).send("Acquisto eseguito");

})

