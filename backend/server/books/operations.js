const check = require("../checkData")

/**
 * checks in the db if the isbn of he book 
 * passed is present
 * 
 * @param {Number} isbn 
 * @returns true if the book is present, false otherwise
 * @throws Error if the isbn passed is not valid
 */
exports.isValid = (isbn) => {

    // check if the isbn is valid
    if(!check.isbn(isbn))
        throw new Error("isbn not valid");

    // check in db if the books is present
    let book = db.get("books").value().filter(b => b.isbn == isbn)[0]
       
    if (!book || book.length == 0) {
        return false;        
    }else{
        return true;
    }
    
}

exports.getBookFromIsbn = (isbn) => {
    
    try {
        if(!this.isValid(isbn))
            return false;    
    } catch (error) {
        return false;
    }

    return db.get("books").value().filter(b => b.isbn == isbn);

}