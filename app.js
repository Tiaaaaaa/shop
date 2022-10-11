express = require('express');

app = express();

const routing = require('./frontend/routing');
setRoutes(app);

require("./backend/server/storage/requestes");
require("./backend/server/books/requestes");
require("./backend/server/users/requestes");

const ddl = require("./backend/DB/ddl")


const StormDB = require("stormdb");
const cfRegEx = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/i

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine('backend/DB/db.stormdb');
db = new StormDB(engine);

// Definizione di default (come si presenta il file json in caso di db vuoto)
db.default({
    "users": [
        new ddl.User("RRGMTT01P22F119U", 0)
    ],
    "books": [
        new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),
        new ddl.Book(2123456789012,"inglese","ciao","U","sto cazzo",2, "2 Informatica")
    ],
    "storage": [
        new ddl.Storage(new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true),
        new ddl.Storage(new ddl.Book(2123456789012,"inglese","ciao","U","sto cazzo",2, "2 Informatica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true),
        new ddl.Storage(new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true),
    ]
})


db.save();

const port = 3000;

// Interfaces

/**
 * Log alla console del server per il "tutto okay"
 */
app.listen(port, () => console.log(`Funziona, porta: ${port}`))
