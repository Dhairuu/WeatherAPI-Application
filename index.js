const APIKey = '47476e7529cf3643d578705765c74016';
const Card = document.getElementById('Card');
const Input = document.querySelector('#Form input');
const Submit = document.getElementById('Submit')
const CityForm = document.getElementById('Form');
const ErrorDiv = document.getElementById(`ErrorDisplay`);

const CityDisplay = document.getElementById(`CityDisplay`);
const Temp = document.getElementById(`Temp`);
const HumidityDisplay = document.getElementById(`HumidityDisplay`);
const PredictionDisplay = document.getElementById(`PredictionDisplay`);
const WeatherEmoji = document.getElementById(`weather-emoji`);

CityForm.addEventListener(`submit`,async (event)=>{
    event.preventDefault();
    Card.style.display=`flex`;
    const City = Input.value;
    if(City) {
        try {
            const WeatherData = await GetWeatherData(City);
            DisplayData(WeatherData);
            ErrorDiv.classList.add(`DisplayNone`);
        }
        catch(error) {
            console.error(error);
            CityDisplay.classList.add(`DisplayNone`);
            Temp.classList.add(`DisplayNone`);
            HumidityDisplay.classList.add(`DisplayNone`);
            PredictionDisplay.classList.add(`DisplayNone`);
            WeatherEmoji.classList.add(`DisplayNone`);
            DisplayError(error);
        }
    }
    else {
        CityDisplay.classList.add(`DisplayNone`);
        Temp.classList.add(`DisplayNone`);
        HumidityDisplay.classList.add(`DisplayNone`);
        PredictionDisplay.classList.add(`DisplayNone`);
        WeatherEmoji.classList.add(`DisplayNone`);
        DisplayError(`Please enter a city`)
    }
})

async function GetWeatherData(City) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${APIKey}`);
    if(!response.ok) {
        throw new Error(`Could not find the city`);
    }
    else {
        // console.log(response.json());
        return await response.json();
    }
}

function DisplayData(data) {
    const {name,main,weather} = data;
    const {humidity,temp} = main;
    const [{description,id}] = weather;
    const Emoji = GetWeatherEmoji(id);
    CityDisplay.textContent = name;
    Temp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    HumidityDisplay.textContent = `Humidity: ${humidity}%`;
    PredictionDisplay.textContent = description;
    WeatherEmoji.textContent = Emoji;

    CityDisplay.classList.remove(`DisplayNone`);
    Temp.classList.remove(`DisplayNone`);
    HumidityDisplay.classList.remove(`DisplayNone`);
    PredictionDisplay.classList.remove(`DisplayNone`);
    WeatherEmoji.classList.remove(`DisplayNone`);
}

function GetWeatherEmoji(id) {
    if(id>=200 && id<300) {
        return `⛈️`;
    }
    else if(id>=300 && id <500) {
        return `🌦️`;
    }
    else if(id>=500 && id <600) {
        return `🌧️`;
    }
    else if(id>=600 && id <700) {
        return `❄️`;
    }
    else if(id>=700 && id <800) {
        return `🌪️`;
    }
    else if(id == 800) {
        return `☀️`;
    }
    else if(id>800 && id <810) {
        return `🌥️`;
    }
    else {
        return `❓`;
    }
}

function DisplayError(message) {
    const ErrorMessage = document.getElementById('ErrorDisplay');
    ErrorMessage.textContent = message;
    ErrorMessage.classList.remove('DisplayNone');
}