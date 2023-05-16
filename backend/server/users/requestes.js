const check = require("../checkData")
const usersFun = require("./operations")

/**
 * Address used to get the position of a user from the cf
 * 
 * @param {String} cf the code of the customer
 */
app.get('/users/get-id', (req, res) => {
    if (!check.cf(req.query.cf)){
        res.sendStatus(400);
        return;
    }
    
    if(usersFun.exist(req.query.cf)){
        res.json({id : db.get("users").value().filter(u => u.cf == req.query.cf)[0].id}); 
    }else{
        res.json({id : usersFun.addUser(req.query.cf).id});
    }
});

app.put('/users/add-user', (req, res) => {
    if (!check.cf(req.body.cf)){
        res.status(400).send("code format wrong");
        return;
    }
    
    if(usersFun.exist(req.query.cf)){
        res.status(400).send("user already inserted")
        return;
    }

    res.json(usersFun.addUser(req.body.cf));

})