import './main.css';

const API_KEY = 'L89HBC8Z8F345QL3ZZ7X74ZGU';
const weatherDisplay = document.getElementById("weatherDisplay");
const submitBtn = document.getElementById("weatherSubmit");

submitBtn.addEventListener('click', async () => {
    const location = document.getElementById("location").value;
    if(!location) return alert ("Please enter location!");

    const weatherURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`;

    try {
        const res = await fetch(weatherURL);
        const data = await res.json();
        const current = data.currentConditions;
        const sunrise = current.sunrise;
        const sunset = current.sunset;

        weatherDisplay.innerHTML = `
            <h2>Weather in ${data.resolvedAddress}</h2>
            <p><strong>Temperature: </strong>${current.temp}°C</p>
            <p><strong>Humidity:</strong> ${current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${current.windspeed} km/h</p>
            <p><strong>Sunrise:</strong> ${sunrise}</p>
            <p><strong>Sunset:</strong> ${sunset}</p>
            <p><strong>Min Temp:</strong> ${data.days[0].tempmin} °C</p>
            <p><strong>Max Temp:</strong> ${data.days[0].tempmax} °C</p>
            <p><strong>Real Feel:</strong> ${current.feelslike} °C</p>
        `;
        console.log('raw: ', current.sunrise);
        console.log('raw set: ', current.sunset);
    } catch (error) {
        weatherDisplay.innerHTML = `<p>Error fetching weather data in ${location}. please double check the spelling and try again later.</p>`;
        console.error(error);
    }
});