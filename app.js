const path = require('path');

const dbMan = require(path.join(__dirname, "backend/DB/db-management"));

express = require('express');

app = express();
var bodyParser = require('body-parser')

// create application/json parser
let jsonParser = bodyParser.json()

const storage = require(path.join(__dirname, 'backend/server/storage'))
const books = require(path.join(__dirname, 'backend/server/books'))
let routing = require(path.join(__dirname, 'frontend/routing'))

console.log(routing.function)

const StormDB = require("stormdb");
const cfRegEx = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine(path.join(__dirname, "backend/DB/db.stormdb"));
db = new StormDB(engine);

// Definizione di default (come si presenta il file json in caso di db vuoto)
db.default({
    "users": [
        { "cf": "RRGMTT01P22F119U", "id": 0 }
    ], "books": [
        { "isbn": 1, "title": "ciao", "price": 2 },
        { "isbn": 2, "title": "ciao", "price": 2 }
    ],
    "storage": [{
        "book": { "isbn": 1, "title": "ciao", "price": 2 },
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
