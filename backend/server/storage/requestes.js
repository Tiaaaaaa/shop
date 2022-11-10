const bodyParser = require('body-parser')
const usersFun = require("../users/operations")
const storageFun = require("./operations")
const check = require("../checkData")
const path = require("path")
const recFun = require("../../receipts/operations")

// create application/json parser
let jsonParser = bodyParser.json()

/**
 * address to get the list of books
 * deposied by a customer from the id code
 * 
 * @param {String} cf the id code
 */
app.get('/storage/given-from-cf', (req, res) => {

    let cf = req.query.cf;

    if (!cf)
        res.status(400).send("cf mancante");

    if (!check.cf(cf))
        res.status(400).send("cf errato");

    let guest = usersFun.exist(cf);

    if (!guest) {
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
app.put('/storage/add-to-storage', jsonParser, (req, res) => {


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
        res.status(200).send("book added");
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
app.get('/storage/search-in-storage', (req, res) => {

    let inStorage = db.get("storage").value();

    if (req.query.book) {
        try {
            inStorageFun.isValid(req.query.book)
        } catch (error) {
            res.status(400).send(error);
            return;
        }

        inStorage = inStorage.filter(b => b.book.isbn == req.query.book);
    }

    if (req.query.section) {
        inStorage = inStorage.filter(b => b.book.section == req.query.section);
    }

    if (req.query.subject) {
        inStorage = inStorage.filter(b => b.book.subject == req.query.subject);
    }

    if (req.query.inSale) {
        inStorage = inStorage.filter(b => b.buyer == null);
    }

    if (inStorage.length == 0) {
        res.status(404).send("Nessun libro presente");
        return;
    }

    res.send(inStorage);

});


app.put('/storage/buy', jsonParser, (req, res) => {

    data = req.body;

    console.log("rischiesta fatta a /storage/buy");

    console.log(data);

    buyer = data[data.length - 1];

    // FARE LA BUY CHE FUNZIONA, CI HAI MESSO UNA PROMISE, VEDI SE TENERLA
    // VEDI SE HA SENSO CERCARE COSÌ I LIBRI (buyer, isbn, position). 

    req.body.forEach(element => {
        data.price += Number(element.price);
        storageFun.buy(buyer, element.id)
    });

    recFun.create(data);

    res.status(200).send("Acquisto eseguito");

})
