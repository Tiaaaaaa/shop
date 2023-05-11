const check = require("../checkData")
const ddl = require("../../DB/ddl")
const booksFun = require("../books/operations")
const usersFun = require("../users/operations")

/**
 * returns an array of books deposied by a customer
 * making a search starting from the id code
 * 
 * @param {String} cf the id code
 * @returns an array of books
 * @throws error if the id code is not valid
 */
exports.getFromId = (cf) => {

    if (!check.cf(cf))
        throw new Error("id code not valid");

    let storage = db.get("storage").value();

    let filtredStorage = storage.filter(s => s.seller.cf == cf);

    return filtredStorage;
}

exports.bougthFromId = (cf) => {

    if (!check.cf(cf))
        throw new Error("id code not valid");

    let books = db.get("sold").value();

    let filtredBooks = books.filter(s => s.buyer.cf == cf);

    return filtredBooks;
}

/**
 * add a book to the storage after checking
 * all the infos passed
 * 
 * @param {Number} isbn the isbn of the book
 * @param {String} seller the id code of the seller
 * @param {Boolean} state the state of usury of the books
 * @throws Error if and info is wrong
 */
exports.addToStorage = (isbn, seller, state) => {

    if (!check.cf(seller)) {
        throw new Error("id code not valid");
    }
    if (!check.isbn(isbn)) {
        throw new Error("isbn not valido");
    }

    let book = booksFun.getBookFromIsbn(isbn)

    if (!book) {
        throw new Error("book not valid")
    }

    let user = usersFun.getUserFromCf(seller);

    if (!user) {
        user = usersFun.addUser(seller)
    }
    var id;

    if (db.get("storage").value().length == 0) {
        id = 0;
    } else {
        id = db.get("storage").value().slice(-1)[0].id + 1;
    }

    try {
        db.get("storage").push(new ddl.Storage(book, user, new Date(Date.now()), state, id));
    } catch (error) {
        console.error(error);
    }

    db.save();

}

/**
 * "Buy a book", with the isbn passed at the position passed
 * by the buyer passed.
 * It modifies the db.
 * 
 * @param {String} buyer the cf of the buyer
 * @param {Number} isbn the isbn of the book
 * @param {Number} position the position in witch the book is
 * @return {Promise} a promise that resolve if the db is updated, reject otherwise
 */
exports.buy = (buyer, id) => {

    Promise((resolve, reject) => {
        try {
            storageFil = db.get("storage").filter(s => s.id != id).value();

            if (storageFil.length == 0) reject("non ci sono libri con questo id");

            console.log("storageFil id: " + id);
            console.log(storageFil);

            toInsert = new ddl.Sold(storageFil.book, buyer, storageFil.seller, new Date(Date.now()));
            console.log(toInsert)
            db.get("sold").push(toInsert);

            db.save();

            resolve();
        } catch (error) {
            reject();
        }
    });
}

exports.stash = (id) => {

    new Promise((resolve, reject) => {

        storage = db.get("storage").value();

        var pos = -1;

        for (let i = 0; i < storage.length; i++) {
            const element = storage[i];

            if (element.id == id) {
                pos = i;
                break;
            }
        }

        if (pos == -1) reject("id not found");

        db.get("storage").get(pos).get("stashed").set(true);

        db.save();

        resolve();

    });
}


exports.unstash = (id) => {

    new Promise((resolve, reject) => {

        storage = db.get("storage").value();

        var pos = -1;

        for (let i = 0; i < storage.length; i++) {
            const element = storage[i];

            if (element.id == id) {
                pos = i;
                break;
            }
        }

        if (pos == -1) reject("id not found");

        db.get("storage").get(pos).get("stashed").delete();

        db.save();

        resolve();

    });
}