express = require('express');

app = express();

require("./backend/server/storage/requestes");
require("./backend/server/books/requestes");
require("./backend/server/users/requestes");
require("./backend/receipts/requestes");

const ddl = require("./backend/DB/ddl")


const StormDB = require("stormdb");

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('backend/DB/db.stormdb');
db = new StormDB(engine);


// Definizione di default (come si presenta il file json in caso di db vuoto)
db.default({
    "users": [
        {
            "cf": "RRGMTT01P22F119U",
            "id": 0
        },
        {
            "cf": "ciao",
            "id": 1
        }
    ],
    "books": [
        {
            "isbn": 9788891909664,
            "subject": "Programmazione I",
            "title": "Programmare in go",
            "volume": "U",
            "publisher": "Pearson",
            "price": 3200,
            "section": "I Informatica"
        },
        {
            "isbn": 9788808352026,
            "subject": "Architettura degli elaboratori",
            "title": "Struttura e progetto dei calcolatori",
            "volume": "U",
            "publisher": "Zanichelli",
            "price": 5150,
            "section": "I Informatica"
        },
        {
            "isbn": 9788820722180,
            "subject": "Matematica",
            "title": "Calcolo",
            "volume": "U",
            "publisher": "Liguori Editore",
            "price": 4499,
            "section": "I Informatica"
        }
    ],
    "storage": [
    ],
    "sold": [
    ]
})


db.save();

const port = 3000;

// Interfaces

/**
 * Log alla console del server per il "tutto okay"
 */
app.listen(port, () => console.log(`Funziona, porta: ${port}`))
