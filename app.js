express = require('express');

app = express();

const routing = require('./frontend/routing');
setRoutes(app);

const storageInt = require("./backend/server/storage/requestes");

const StormDB = require("stormdb");
const cfRegEx = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('backend/DB/db.stormdb');
db = new StormDB(engine);

// Definizione di default (come si presenta il file json in caso di db vuoto)
db.default({
    "users": [
        { "cf": "RRGMTT01P22F119U", "id": 0 }
    ],
    "books": [{ 
            "isbn": 1, 
            "title": "ciao", 
            "price": 2,
            "subject": "math",
            "volume": "1",
            "publisher": "sto cazzo",
            "section": "1 Chimica"
        },
        { 
            "isbn": 2, 
            "title": "ciao", 
            "price": 2,
            "subject": "inglese",
            "volume": "1",
            "publisher": "sto cazzo",
            "section": "2 Informatica"
        }
    ],
    "storage": [{
        "book": { 
            "isbn": 1, 
            "title": "ciao", 
            "price": 2,
            "subject": "math",
            "volume": "1",
            "publisher": "sto cazzo",
            "section": "1 Chimica"
        },
        "seller": { "cf": "RRGMTT01P22F119U", "id": 0 },
        "buyer": null,
        "buyDate": new Date("August 2, 2022"),
        "sellDate": null,
        "state": true
    }
    ]
})


db.save();

const port = 3000;

// Interfaces

/**
 * Log alla console del server per il "tutto okay"
 */
app.listen(port, () => console.log(`Funziona, porta: ${port}`))
