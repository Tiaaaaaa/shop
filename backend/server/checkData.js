/**
 * Check for the validity of the identification code (italian format)
 * 
 * @param {String} code 
 * @returns true if the identification code id valid, false otherwise
 */
exports.cf = (code) => {

    const cfRegEx = /^(?:[A-Z][AEIOU][AEIOUX]|[AEIOU]X{2}|[B-DF-HJ-NP-TV-Z]{2}[A-Z]){2}(?:[\dLMNP-V]{2}(?:[A-EHLMPR-T](?:[04LQ][1-9MNP-V]|[15MR][\dLMNP-V]|[26NS][0-8LMNP-U])|[DHPS][37PT][0L]|[ACELMRT][37PT][01LM]|[AC-EHLMPR-T][26NS][9V])|(?:[02468LNQSU][048LQU]|[13579MPRTV][26NS])B[26NS][9V])(?:[A-MZ][1-9MNP-V][\dLMNP-V]{2}|[A-M][0L](?:[1-9MNP-V][\dLMNP-V]|[0L][1-9MNP-V]))[A-Z]$/

    if (cfRegEx.test(code)) {
        return true;
    }else {
        return false;
    }
}

/**
 * Check for the validity of the book id (isbn)
 * 
 * @param {Number} isbn
 * @returns true if valid, false otherwise
 */
exports.isbn = (isbn) => {
    if (isbn.toString().length == 13 && !isNaN(isbn)) {
        return true;
    }else{
        return false;
    }
}