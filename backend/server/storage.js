var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

/**
 * manda una lista di libri.
 * in base al codice fiscale mandato nella richiesta si 
 * eseguirà una ricerca per tutti i libri messi in vendita
 * dall'utente indicato.
 */
app.get('/given-from-cf', (req, res) => {

    let cf = req.query.cf;

    if (!cf)
        res.status(400).send("cf mancante");

    if (!cfRegEx.test(cf))
        res.status(400).send("cf errato");

    let guest = db.get("users").value().filter(u => u.cf == cf);

    if (guest.length == 0) {
        addUser(cf);
        res.send([]);
        return;
    }

    let storage = db.get("storage").value();

    storage = storage.filter(s => s.seller.cf == cf);

    let qRes = [];

    storage.forEach(stored => {
        qRes.push(stored.book);
    });

    res.send(qRes);

});


/**
 * indirizzo per la richiesta di aggiungere 
 * un libro al magazzino.
 * nella richiesta è necessario che ci siano il 
 * codice fiscale del venditore e il libro 
 * che vuole mettere in vendita. 
 */
app.put('/add-to-storage', jsonParser, (req, res) => {

    /*   
       if (!req.body.book || !req.body.seller || !req.body.state) {
           console.log(req.body);
           res.status(400).send("insereire tutte le indormazioni")
           return;
      }
   */
   
       // Controlla se il codice fiscale è valido
       if (!cfRegEx.test(req.body.seller)) {
           console.log(req.body);
           res.status(400).send("codice fiscale inviato non valido");
           return;
       }
   
       // Controlla se il libro fornito è valido
       let book = db.get("books").value().filter(b => b.isbn == req.body.book)[0]
       
       if (!book || book.length == 0) {
           res.status(406).send("Libro non valido");
           return;
       }
   
       // Controlla che l'utente esista
       let user = db.get("users").value().filter(u => u.cf == req.body.seller)[0];
   
       if (user.length == 0)
           user = addUser(req.body.seller);
   
       // Definizione dello stato d'usura
       let state;
   
       if (req.body.state == 1){
           state = true;
       }else{
           state = false;
       }
   
       db.get("storage").push(
           {
               "book": book,
               "seller": user,
               "buyer": null,
               "buyDate": Date.now(),
               "sellDate": null,
               "state": state
           }
       )
   
       db.save();
   });

   
app.get('/search-in-storage', (req,res) => {

    let qRes;

    if (req.query.book) {
        qRes = db.get("storage").value().filter(s => s.book.isbn == req.query.book);
    } else if (req.query.class) {
        qRes = db.get("storage").value().filter(s => s.book.class == req.query.class);
    } else {
        res.status(400).send("inviare una richiesta idonea");
        return;
    }

    res.send(qRes);

});
