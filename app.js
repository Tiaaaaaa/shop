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
            "isbn": 1234567890123,
            "subject": "math",
            "title": "ciao",
            "volume": "1",
            "publisher": "sto cazzo",
            "price": 2,
            "section": "1 Chimica"
        },
        {
            "isbn": 1597532584565,
            "subject": "Figologia",
            "title": "la figa di tua madre",
            "volume": "1",
            "publisher": "Michela Murgia",
            "price": 10,
            "section": "5 Informatica"
        },
        {
            "isbn": 2123456789012,
            "subject": "inglese",
            "title": "ciao",
            "volume": "U",
            "publisher": "sto cazzo",
            "price": 2,
            "section": "2 Informatica"
        }
    ],
    "storage": [
        {
            "book": {
                "isbn": 1597532584565,
                "subject": "Figologia",
                "title": "la figa di tua madre",
                "volume": "1",
                "publisher": "Michela Murgia",
                "price": 10,
                "section": "5 Informatica"
            },
            "buyDate": "2023-05-02T09:38:38.818Z",
            "seller": {
                "cf": "RRGMTT01P22F119U",
                "id": 0
            },
            "id": 1,
        }
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
