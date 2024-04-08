var sqlite3 = require('sqlite3').verbose();
const dbfile = "./db.sqlite";

let db = new sqlite3.Database(dbfile, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connecté à la base de donnée");
        db.run(`CREATE TABLE ville (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text NOT NULL,
            lon text,
            lat text,
            lastdate text,
            temperature text,
            skystate text
            )`,
        (err) => {
            if (err) {
                // Table déjà créée
            } else{
                // Table créée, création de ligne
                var insert = `INSERT INTO ville (name, lon, lat, lastdate, temperature, skystate) VALUES (?,?,?,?,?,?)`;
            }
        });
    }
});

module.exports = db