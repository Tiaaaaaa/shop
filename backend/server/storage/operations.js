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
exports.getFromCf = (cf) => {

    if (!check.cf(cf))
        throw new Error("id code not valid");

    let storage = db.get("storage").value();

    let filtredStorage = storage.filter(s => s.seller.cf == cf);

    return filtredStorage;
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

    if (user === false) {
        user = usersFun.addUser(seller)
    }

    id = db.get("storage").value().at(-1).id;

    let toAdd = new ddl.Storage(book, user, new Date(Date.now()), state, id + 1);

    try {
        db.get("storage").push(toAdd);

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

    const prom = new Promise((resolve, reject) => {

        storageFil = db.get("storage").filter(s => s.id = id).value();

        if(storageFil.length == 0) reject("non ci sono libri con questo id");

        console.log("storageFil id: "+ id );
        console.log(storageFil);

        toInsert = new ddl.Sold(storageFil.book, buyer, storageFil.seller, new Date(Date.now()));
        console.log(toInsert)
        db.get("sold").push(toInsert);
        
        db.save();

        resolve();
    });
}
