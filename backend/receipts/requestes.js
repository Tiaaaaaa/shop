const op = require("./operations")

app.get('/receipts/get-from-cf', (req, res)=>{

    op.get(req.query.cf).then((a)=>{
        res.send(a);
    })

});