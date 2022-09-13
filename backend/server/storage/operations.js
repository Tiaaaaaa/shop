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
 * returns an array of books present in the storage
 * making a search starting from the class in witch 
 * are adopted the books
 * 
 * @param {String} section the class used for doing the search in the db 
 */
exports.getFromClass = (section) => {
    return db.get("storage").value().filter(s => s.class)
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
    if (!check.cf(seller))
        throw new Error("id code not valid");
    
    if (!check.isbn(isbn))
        throw new Error("isbn not valid");

    if (!booksFun.isValid(isbn))
        throw new Error("book not adopted");

    let book = booksFun.getBookFromIsbn(isbn)

    if (!book)
        throw new Error("book not valid")

    let user = usersFun.getUserFromCf(cf);

    if (!user)
        throw new Error("user not valid")

    let toAdd = new ddl.Storage(book, user, Date.now(), state);

    db.get("storage").push(toAdd);

    db.save();

}