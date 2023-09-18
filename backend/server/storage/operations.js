const check = require("../checkData")
const ddl = require("../../DB/ddl")
const booksFun = require("../books/operations")
const usersFun = require("../users/operations")
const recFun = require("../receipts/operations")

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
 * @param {int[]} ids the array containing the ids of the books into storage
 */
exports.buy = async (buyer, ids) => {

	try {
		return await new Promise((resolve, reject) => {

			let bookList = [];

			for (const id of ids) {

				storage = db.get("storage").value();

				let current = "";
				storage.forEach(storageEl => {

					console.log(storageEl.id);
					if (storageEl.id == id) {
						current = storageEl;
						return;
					}

				});

				if (current === "") {
					reject("not found");
				}

				const date = new Date();

				toInsert = new ddl.Sold(current.book,
					buyer,
					current.seller,
					date.toLocaleString('it-IT', {
						timeZone: 'Europe/Rome',
					})
				);

				db.get("sold").push(toInsert)

				db.save()

				bookList.push(current.book);

			}

			recFun.create(bookList, buyer)
			resolve()

		}).catch((e) => console.log(e));
	} catch (e) {
		console.log(e)
	}
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

		db.get("storage").get(pos).set("stashed", true);

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


exports.unstashAll = () => {

	new Promise((resolve, reject) => {

		storage = db.get("storage");

		storage.map(x => {
			console.log(x);
			delete x.stashed;
			console.log(x);
		})

		/*
				for (let i = 0; i < storage.length(); i++) {
					const element = storage[i];
					element.get(i).get("stashed").delete();
					console.log(element.get(i));
				}
		*/
		//   db.save();

		resolve();

	});
}