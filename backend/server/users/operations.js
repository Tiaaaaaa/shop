const ddl = require("../../DB/ddl")
const check = require("../checkData")

exports.exist = (cf) => {

    let user = db.get("users").value().filter(u => u.cf == cf)[0];
    
    if (user != undefined){
        return user;
    }else{
        return false;
    }
}

/**
 * add a new user to the db.
 * the id code is the one passed, 
 * the id number is iserted progressively 
 * 
 * @param {String} cf the id code
 * @returns the new user if the id code is valid and new into the db, 
 *          false otherwise.
 */
exports.addUser = (cf) => {

    if(!check.cf(cf))
        throw new Error("code inserted wrong");

    if (this.exist(cf))
        return false;

    let newUser = new ddl.User(cf);

	db.get("users").sort((a, b) => b.id - a.id);
	let id = db.get("users").get(0).get("id").value() + 1;

	newUser.id = id;

	db.get("users").push(newUser);

	db.save();

	return newUser;

}

/**
 * return an User object searching with 
 * the infos into the db
 * 
 * @param {String} cf the id code
 * @returns the new user if the id code is valid and new into the db, 
 *          false otherwise.
 */
exports.getUserFromCf = (cf) => {

    if(!check.cf(cf))
        throw new Error("id code format wrong")

    if (!this.exist(cf))
        return false;

    return db.get("users").value().filter(u => u.cf == cf)[0];

}