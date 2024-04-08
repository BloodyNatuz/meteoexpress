var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "./db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connecté à la base de donnée");
        db.run(`CREATE TABLE ville (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            lon text NOT NULL,
            lat text NOT NULL,
            lastdate text,
            temperature text,
            windspeed text,
            windir text,
            skystate text
            )`,
        (err) => {
            if (err) {
                // Table déjà créée
            } else{
                // Table créée, création de ligne
                var insert = `INSERT INTO ville (name, lon, lat, lastdate, temperature, windspeed, windir, skystate) VALUES (?,?,?,?,?,?,?,?)`
                db.run(insert, ["test", "test", "test", "test", "test", "test", "test", "test"])
            }
        });
    }
});

module.exports = db