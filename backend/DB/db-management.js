const path = require("path");

const ddl = require(path.join(__dirname, "/db-ddl"));

/* add a book into the list of valid book */
exports.addBook = (isbn, title, price) => {

	console.log(db.get("books").value().filter(b => b.isbn == isbn))

	if (db.get("books").value().filter(b => b.isbn == isbn) != []){
		return false;
	}
	
	let newBook = Object.create(ddl.book);

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

/**
 * Funzione per aggiungere un nuovo utente.
 * 
 * Passando il codice fiscale verrà aggiunto un nuovo
 * utente un id scalato in base a tutti gli altri.
 * @param {String} cf il codice fiscale dell'utente
 */
exports.addUser = (cf) =>  {

	if (db.get("users").value().filter(u => u.cf == cf).length != 0)
		return false;

	let newUser = Object.create(ddl.user(cf));

	newUser.cf = sellerCf;

	db.get("users").sort((a, b) => b.id - a.id);
	let id = db.get("users").get(0).get("id").value() + 1;

	newUser.id = id;

	db.get("users").push(newUser);

	db.save();

	return newUser;
}

/* Add a book to the storage (if is valid), 
 *  if not valid returns false, true instead
 */
exports.addBookToStorage = (isbn, sellerCf) => {

	let book = this.searchBook(isbn);

	if (book == [])
		return false;

	let toStore = Object.create(ddl.storage);
	toStore.book = book[0];

	seller = db.get("users").value().filter(u => u.cf == sellerCf);

	if (seller = []) {

		toStore.seller = this.addUser(sellerCf);

		db.get("storage").push(toStore);

	} else {

		toStore.seller = seller;
		db.get("storage").push(toStore);

	}

	db.save();

	return true;

}

exports.givenFromCF = (cf) => {
	return db.get("storage").value().filter(s => s.seller == cf);
}