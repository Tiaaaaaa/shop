const check = require("../checkData");

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

    return db.get("books").value().filter(b => b.isbn == isbn)[0];

}

/**
 * Add a new book into the db after checking
 * if the book isn't altready into the db.
 * 
 * @param {Number} isbn 
 * @param {String} subject 
 * @param {String} volume 
 * @param {String} publisher 
 * @param {Numer} price 
 * @param {String} section
 * @returns false if the book is already into the db,
 * 			the object of the book if inserted
 */
 exports.addBook = (isbn, subject, title, volume, publisher, price, section) => {

	db.get("books").value().filter(b => b.isbn == isbn);

	if (db.get("books").value().filter(b => b.isbn == isbn) != []){
		return false;
	}
	
	let newBook = new ddl.Book(isbn, subject, title, volume, publisher, price, section);

	db.get("books").push(newBook);

	db.save();

	return newBook;

}