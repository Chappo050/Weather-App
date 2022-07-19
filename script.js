
let searchBtn = document.getElementById("Search");
searchBtn.addEventListener("click", getData, false)
searchBtn.click();

function getData(){
    console.log('Button clicked');
    try{
        let locationData = document.getElementById('searchText').value;
        if (locationData) {
            console.log(locationData);
            let weatherData = {}
            weatherData = accessAPI(locationData);
        } else {
            handleDefultData();
        }

    }
    catch (error){
        console.log(error);
        handleDefultData();
    }

}

function handleDefultData() {
    console.log('Setting defualt location.');
    let weatherData = {};
    weatherData = accessAPI('Tokyo');
}

async function accessAPI(location) {
    try {
        console.time('APIReadTime');
        const weatherData = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=2d8a1cfb755c9c9a78a8409f2ec0237e&units=metric', {mode: "cors"});
        const dataJson = await weatherData.json();
        console.timeEnd('APIReadTime');

        let weatherObj = {};

        weatherObj = {
            tempAct: dataJson.main.temp,
            tempFeels:dataJson.main.feels_like,
            place: dataJson.name,
        };
        updateUI(weatherObj);
    } catch (error) {
        console.log(error);
    }

}

function updateUI (data){
    //temp is in Kelvin
    document.getElementById('location').innerHTML = data.place;
    document.getElementById('tempAct').innerHTML = parseFloat(data.tempAct).toFixed(2) + ' &degC';
    document.getElementById('tempFeels').innerHTML = parseFloat(data.tempFeels).toFixed(2) + ' &degC';
}