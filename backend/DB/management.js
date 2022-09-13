const path = require("path");

const ddl = require(path.join(__dirname, "/ddl"));

/**
 * Add a new book into the db after checking
 * if the book isn't altready into the db.
 * 
 * @param {Number} isbn 
 * @param {String} title 
 * @param {Numer} price 
 * @returns false if the book is already into the db
 * 			the object of the book if inserted
 */
exports.addBook = (isbn, title, price) => {

	console.log(db.get("books").value().filter(b => b.isbn == isbn))

	if (db.get("books").value().filter(b => b.isbn == isbn) != []){
		return false;
	}
	
	let newBook = new ddl.Book(isbn, subject, title, )

	newBook.isbn = isbn;
	newBook.title = title;
	newBook.price = price;


	db.get("books").push(newBook);

	db.save();

	return newBook;

}

/* Returns an array with the book with the passed isbn (empty if not valid) */
exports.searchBook = (isbn) => {
	return db.get("books").value().filter(b => b.isbn == isbn);
}
