var Twig = require("twig"),
    express = require('express'),
    app = express();
var db = require("./database.js")
var bodyParser = require("body-parser");
const cron = require('node-cron');
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
// Mettre à jour les infos des villes via l'API toutes les heures
async function updateVilles(){
    let setToday = new Date();
    let todayDate = setToday.toISOString();
    let todayHour = todayDate.substring(0, todayDate.indexOf(':'));

    async function getVilles(){
        let url = 'http://localhost:4000/api/villes';
        try {
            let res = await fetch(url);
            let brutDatas = await res.json();
    
            let cleanDatas = brutDatas.rows;
    
            return await cleanDatas;
        } catch (error){
            console.error(error);
        }
    }
    
    let villes = await getVilles();

    villes.forEach(async ville => {
        let name = `${ville.name}`;
        let lon = `${ville.lon}`;
        let lat = `${ville.lat}`;
        let urlApi = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + lat + '&lon=' + lon;
        
        try {
            let res = await fetch(urlApi);
            let datas = await res.json();
            if (!res.ok) {
                console.error(res.status);
            } else {
                // Vérifier chaque date jusqu'à avoir celle d'aujourd'hui
                let nowDatas = datas.properties.timeseries;
                nowDatas.forEach(async nowData => {
                    let nowHour = nowData.time.substring(0, nowData.time.indexOf(':'));
                    if (nowHour == todayHour) {
                        // Si l'heure est la même que celle proposée par l'API est la même : on met a jour les datas
                        let nowTemp = nowData.data.instant.details.air_temperature;
                        let nowWeather = nowData.data.next_1_hours.summary.symbol_code;

                        let setData = {
                            lon: lon,
                            lat: lat,
                            lastdate: nowHour,
                            nowTemp: nowTemp,
                            nowWeather: nowWeather,
                            name: name,
                        }

                        try { 
                            const res = await fetch("http://localhost:4000/api/villes", {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(setData)
                            })
                        } catch (error) {
                            console.error(error);
                        }
                    }
                })
            }
        } catch (error) {
            console.error(error);
        }
    })
}
var task = cron.schedule('0 */1 * * *', () => {
    updateVilles();
});
task.start();
app.patch('/api/villes/', (req, res, next) => {
    var data = {
        name: req.body.name,
        temperature: req.body.nowTemp,
        skystate: req.body.nowWeather,
        lastdate : req.body.lastdate,
        lon: req.body.lon,
        lat: req.body.lat,
    };
    db.run(
        `UPDATE ville SET
            name = COALESCE(?,name),
            lon = lon,
            lat = lat,
            temperature = COALESCE(?,temperature),
            skystate = COALESCE(?,skystate),
            lastdate = COALESCE(?,lastdate)
            WHERE lon = COALESCE(?,lon) AND lat = COALESCE(?,lat)`,
        [data.name, data.temperature, data.skystate, data.lastdate, data.lon, data.lat],
        function (err, result) {
            if (err) {
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "data": data
            })
        }
    );
})

app.listen(4000, () => {
    console.log(`App listening on port 4000`);
})