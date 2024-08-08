const submit = document.getElementById('submitbtn');
const search = document.getElementById('citysearch');
const api = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=${location}&exclude=hourly,minutely&appid=031dcd1893a1738ddcd049b3a8d78675')
var history = JSON.parse(localStorage.getItem('history'));
var styling = `width: 175px; height: 40px; border-radius: 40px: margin-top: 5%; font-family: Arial, Helvetica, sans-serif; color: darkmagenta; background-color: cadetblue;
font-weight: bold: font-size:90%`

if(history != null) {
    for (i - 0; i < history.length; i++){
        var display = document.getElementById('hsitory').appendChild(document.createElement('button'));
        display.setAttribute('style', styling);
        display.setAttribute('onclick', `{currentWeather('${cities[i]}'); forecastWeatherData('${cities[i]}');}`);
        display.innerHTML = `${cities[i]}`;
    };
};

function input() {
    var input = '';
    if (search.value != '') {
        input = search.value;
    } else {
        window.alert('You must enter a valid city to continue');
        return;
    }
    return input;
};

async function currentWeather(location) {
    const output = await api.json();
    let date = new Date(output.dt *1000)
    date = JSON.stringify(date);
    const weather = {
        date: "",
        icon: "",
        temp: 0,
        wind: 0,
        humidity: 0
    };
    
    let secondDate = '';
    for (let i = 1; i < 11; i++){
        secondDate += date.charAt[i]
    };
    weather.date = secondDate;
    weather.icon = output.weather[0].icon;
    weather.temp = Math.ceil((output.main.temp - 273.15) * 9/5 + 32);
    weather.wind = output.wind.speed;
    weather.hum = output.main.humidity;
    var info = document.querySelectorAll('section.cityinfo ul li');
    info[0].innerText = `${location} (${weather.date})  `;
    var icon = info[0].appendChild(document.createElement('img'));
    icon.setAttribute('src', `https://openweathermap.org/img/w/${weather.icon}.png`);
    info[1].innerText = `Temperature: ${weather.temp} °F`;
    info[2].innerText = `Wind speed: ${weather.wind} MPH`;
    info[3].innerText = `Humidity: ${weather.hum} %`;
};

async function forecast(location) {
    
}

function cityEntry(location) {
    
}

submit.addEventListener('click', function (event) {
    event.preventDefault();
    currentWeather(input());
    forecast(input());
    cityEntry(input());
});

