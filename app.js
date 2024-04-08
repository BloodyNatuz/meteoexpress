var Twig = require("twig"),
    express = require('express'),
    app = express();
var db = require("./database.js")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'))

// Twig options
app.set('vew engine', 'twig');
app.set('views', './views');
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
app.post('/api/villes', (req, res, next) => {
    var errors=[];
    var data = {
        name: req.body.sentName,
        lon: req.body.sentLon,
        lat: req.body.sentLat,
        lastdate: req.body.lastUpdate,
        temperature: req.body.temp,
        skystate:req.body.weather
    };
    var sql = `INSERT INTO ville (name, lon, lat, lastdate, temperature, skystate) VALUES (?,?,?,?,?,?)`;
    var params = [data.name, data.lon, data.lat, data.lastdate, data.temperature, data.skystate];
    db.run(sql, params, function(err, result) {
        if (err) {
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "data": data
        })
    })
})

app.listen(4000, () => {
    console.log(`App listening on port 4000`);
})