const op = require("./operations")
const path = require("path");

app.get('/receipts/get-from-cf', (req, res)=>{

    op.get(req.query.cf).then((a)=>{
        res.json(a);
    })

});