// Création de la date d'aujourd'hui
let setToday = new Date();
let todayDate = setToday.toISOString();
let todayDay = todayDate.substring(0, todayDate.indexOf('T'));
let todayHour = todayDate.substring(0, todayDate.indexOf(':'));

// Afficher toutes les villes
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
async function renderVilles(){
    let villes = await getVilles();

    let main = document.querySelector("#main");

    villes.forEach(ville => {
        let villeName = `${ville.name}`;
        let villeSkyState = `${ville.skystate}`;

        let villeUrl = '/villes/' + `${ville.id}`;

        let link = document.createElement("a");
        link.href = villeUrl;
        main.appendChild(link);
        let card = document.createElement("div");
        card.classList = "card";
        if (villeSkyState.includes('clear' || villeSkyState.includes('fair'))) {
            card.classList.add("clear-bg");
        } if (villeSkyState.includes('fog')) {
            card.classList.add("fog-bg");
        } if (villeSkyState.includes("sleet")) {
            card.classList.add("sleet-bg");
        } if (villeSkyState.includes("cloudy") || villeSkyState.includes("partly")) {
            card.classList.add("cloudy-bg");
        } if (villeSkyState.includes("rain") && !villeSkyState.includes("thunder")) {
            card.classList.add("rain-bg");
        } if (villeSkyState.includes("rain") && villeSkyState.includes("thunder")) {
            card.classList.add("thunder-bg");
        } if (villeSkyState.includes("sleet") && villeSkyState.includes("thunder")) {
            card.classList.add("sleet-bg");
        } if (villeSkyState.includes("sleet") && !villeSkyState.includes("thunder")) {
            card.classList.add("sleet-bg");
        } if (villeSkyState.includes("snow") && villeSkyState.includes("thunder")) {
            card.classList.add("snow-bg");
        } if (villeSkyState.includes("snow") && !villeSkyState.includes("thunder")) {
            card.classList.add("snow-bg");
        }
        link.appendChild(card);
        let pName = document.createElement("p");
        pName.textContent = villeName;
        pName.classList = "card-title";
        let pSkyState = document.createElement("p");
        pSkyState.textContent = villeSkyState;
        card.appendChild(pName);
        card.appendChild(pSkyState);
    });
}
renderVilles();

// Afficher les villes cherchées
async function searchVille(){
    let villes = await getVilles();
    let search = document.querySelector("#search").value;
    let main = document.querySelector("#main");

    if (search == '') {
        document.querySelectorAll('.card').forEach(e => e.remove());

        villes.forEach(ville => {
            let villeName = `${ville.name}`;
            let villeSkyState = `${ville.skystate}`;
    
            let villeUrl = '/villes/' + `${ville.id}`;

            let link = document.createElement("a");
            link.href = villeUrl;
            main.appendChild(link);
            let card = document.createElement("div");
            card.classList = "card";
            if (villeSkyState.includes('clear' || villeSkyState.includes('fair'))) {
                card.classList.add("clear-bg");
            } if (villeSkyState.includes('fog')) {
                card.classList.add("fog-bg");
            } if (villeSkyState.includes("sleet")) {
                card.classList.add("sleet-bg");
            } if (villeSkyState.includes("cloudy") || villeSkyState.includes("partly")) {
                card.classList.add("cloudy-bg");
            } if (villeSkyState.includes("rain") && !villeSkyState.includes("thunder")) {
                card.classList.add("rain-bg");
            } if (villeSkyState.includes("rain") && villeSkyState.includes("thunder")) {
                card.classList.add("thunder-bg");
            } if (villeSkyState.includes("sleet") && villeSkyState.includes("thunder")) {
                card.classList.add("sleet-bg");
            } if (villeSkyState.includes("sleet") && !villeSkyState.includes("thunder")) {
                card.classList.add("sleet-bg");
            } if (villeSkyState.includes("snow") && villeSkyState.includes("thunder")) {
                card.classList.add("snow-bg");
            } if (villeSkyState.includes("snow") && !villeSkyState.includes("thunder")) {
                card.classList.add("snow-bg");
            }
            link.appendChild(card);
            let pName = document.createElement("p");
            pName.textContent = villeName;
            pName.classList = "card-title";
            let pSkyState = document.createElement("p");
            pSkyState.textContent = villeSkyState;
            card.appendChild(pName);
            card.appendChild(pSkyState);
        });
    } else{
        if (search.length >= 2) {
            villes.forEach(ville => {
                let villeName = `${ville.name}`;
                let villeSkyState = `${ville.skystate}`;
        
                if (villeName.startsWith(search)) {
                    document.querySelectorAll('.card').forEach(e => e.remove());
    
                    let villeUrl = '/villes/' + `${ville.id}`;

                    let link = document.createElement("a");
                    link.href = villeUrl;
                    main.appendChild(link);
                    let card = document.createElement("div");
                    card.classList = "card";
                    if (villeSkyState.includes('clear' || villeSkyState.includes('fair'))) {
                        card.classList.add("clear-bg");
                    } if (villeSkyState.includes('fog')) {
                        card.classList.add("fog-bg");
                    } if (villeSkyState.includes("sleet")) {
                        card.classList.add("sleet-bg");
                    } if (villeSkyState.includes("cloudy") || villeSkyState.includes("partly")) {
                        card.classList.add("cloudy-bg");
                    } if (villeSkyState.includes("rain") && !villeSkyState.includes("thunder")) {
                        card.classList.add("rain-bg");
                    } if (villeSkyState.includes("rain") && villeSkyState.includes("thunder")) {
                        card.classList.add("thunder-bg");
                    } if (villeSkyState.includes("sleet") && villeSkyState.includes("thunder")) {
                        card.classList.add("sleet-bg");
                    } if (villeSkyState.includes("sleet") && !villeSkyState.includes("thunder")) {
                        card.classList.add("sleet-bg");
                    } if (villeSkyState.includes("snow") && villeSkyState.includes("thunder")) {
                        card.classList.add("snow-bg");
                    } if (villeSkyState.includes("snow") && !villeSkyState.includes("thunder")) {
                        card.classList.add("snow-bg");
                    }
                    link.appendChild(card);
                    let pName = document.createElement("p");
                    pName.textContent = villeName;
                    pName.classList = "card-title";
                    let pSkyState = document.createElement("p");
                    pSkyState.textContent = villeSkyState;
                    card.appendChild(pName);
                    card.appendChild(pSkyState);
                }
            });
        }
    }
}

// Ajouter une ville
let addForm = document.getElementById("addForm");
addForm.addEventListener("submit", function(e){
    e.preventDefault();
    console.log("Ville ajoutée");

    // Name, lon, lat
    let sentName = document.getElementById('town-name').value;
    let sentLon = document.getElementById('town-lon').value;
    let lon = sentLon.toString();
    let sentLat = document.getElementById('town-lat').value;
    let lat = sentLat.toString();

    // Requete API
    async function GetWeatherInfos(){
        let urlApi = 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + sentLat + '&lon=' + sentLon;
        try {
            let res = await fetch(urlApi);
            let datas = await res.json();
            if (!res.ok) {
                console.error(res.status);
            } else {
            
                // Temp & weather
                let temp;
                let weather;
                let lastUpdate;
                let todayDatas = datas.properties.timeseries;
                todayDatas.forEach(todayData => {
                    let dateHour = todayData.time.substring(0, todayData.time.indexOf(':'));
                    if (dateHour == todayHour) {
                        lastUpdate = dateHour;
                        temp = todayData.data.instant.details.air_temperature;
                        weather = todayData.data.next_1_hours.summary.symbol_code;
                        return temp, weather;
                    }
                });

                let setData = {
                    sentName: sentName,
                    sentLon: lon,
                    sentLat: lat,
                    lastUpdate: lastUpdate,
                    temp: temp,
                    weather: weather,
                }

                // Sending in the body of the post
                const res = await fetch("/api/villes", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(setData)
                })

                // Refresh the page to see the new content directly
                window.location.reload(true);
            }
        } catch (error) {
            console.error(error);
        }
    }
    GetWeatherInfos();
})