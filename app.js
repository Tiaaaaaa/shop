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
        new ddl.User("RRGMTT01P22F119U", 0)
    ],
    "books": [
        new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),
        new ddl.Book(2123456789012,"inglese","ciao","U","sto cazzo",2, "2 Informatica")
    ],
    "storage": [
        new ddl.Storage(new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true, 0),
        new ddl.Storage(new ddl.Book(2123456789012,"inglese","ciao","U","sto cazzo",2, "2 Informatica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true,1),
        new ddl.Storage(new ddl.Book(1234567890123,"math","ciao","1","sto cazzo",2,"1 Chimica"),new ddl.User("RRGMTT01P22F119U", 0), new Date("August 2, 2022"), true,2),
    ],
    "sold": []
})


db.save();

const port = 3000;

// Interfaces

/**
 * Log alla console del server per il "tutto okay"
 */
app.listen(port, () => console.log(`Funziona, porta: ${port}`))
