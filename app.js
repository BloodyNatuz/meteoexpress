var Twig = require("twig"),
    express = require('express'),
    app = express();
var db = require("./database.js")

// Twig options
app.set("twig options", {
    allowAsync: true,
    strict_variables: false
});

app.get('/', (req, res) => {
    res.render('./index.twig', {
        message: "Hello world!",
        pageName: "Accueil"
    })
})

app.get('/api/villes', (req, res, next) => {
    var sql = "select * from ville";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        } else{
            res.json({
                rows
            });
        }
    });
})

app.listen(4000, () => {
    console.log(`Example app listening on port 4000`);
})