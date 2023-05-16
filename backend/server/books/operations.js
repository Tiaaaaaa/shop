const check = require("../checkData");
const fs = require('fs')
const request = require('request');
const path = require("path");

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
    if (!check.isbn(isbn))
        throw new Error("isbn not valid");

    // check in db if the books is present
    let book = db.get("books").value().filter(b => b.isbn == isbn)[0]

    if (!book || book.length == 0) {
        return false;
    } else {
        return true;
    }

}

exports.getBookFromIsbn = (isbn) => {

    try {
        if (!this.isValid(isbn))
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

    if (db.get("books").value().filter(b => b.isbn == isbn) != []) {
        return false;
    }

    let newBook = new ddl.Book(isbn, subject, title, volume, publisher, price, section);

    db.get("books").push(newBook);

    db.save();

    return newBook;

}

exports.fetchCover = async (isbn) => {
    try {

        const res = await fetch("https://www.googleapis.com/books/v1/volumes?q=" + isbn, { method: 'GET' });

        let prevUrl;

        res.json().then(async (res) => {
            if (res["items"][0]["volumeInfo"]["imageLinks"]) {

                prevUrl = res["items"][0]["volumeInfo"]["imageLinks"]["thumbnail"];

                if (prevUrl) {

                    var download = function (uri, filename, callback) {
                        request.head(uri, function (err, res, body) {
                            console.log('content-type:', res.headers['content-type']);
                            console.log('content-length:', res.headers['content-length']);

                            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
                        });
                    };

                    download(prevUrl, "./backend/server/books/covers_assets/" + isbn + '.jpeg', function () {
                        console.log('done');
                    });


                }
            }
        });


    } catch (error) {
        console.log(error);
    }
}

exports.getCover = (isbn) => {

    if (!this.isValid(isbn))
        throw new Error("isbn not valid");

    const filePath = path.join(__dirname, '/covers_assets/' + isbn + '.jpeg');


    if (fs.existsSync(filePath)) {
        var stat = fs.statSync(filePath);
        var readStream = fs.createReadStream(filePath);

        return { "stream": readStream, "stats": stat };
    } else {
        throw new Error("File non presente");
    }

}