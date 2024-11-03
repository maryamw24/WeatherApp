const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetials = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityName = document.querySelector('.city-name');




search.addEventListener('click', () => {
    const API_KEY = "e270e00c63fb435bc0cea72209d6dc1b";
    const city = document.querySelector('.search-box input').value;
    if (city === '') {
        alert('Please enter a city name');
    }
    else{
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => response.json()).then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetials.classList.remove('active');
                cityName.classList.remove('active');
                error404.classList.add('active');
                return;
            }

            container.style.height = '555px';
            weatherBox.classList.add('active');
            weatherDetials.classList.add('active');
            cityName.classList.add('active');
            error404.classList.remove('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .weather-status');
            const wind = document.querySelector('.weather-details .wind span');
            const humidity = document.querySelector('.weather-details .humidity span');
            cityName.innerHTML = city;
            
            switch(json.weather[0].main) { 
                case 'Clear':
                    image.src = "Assets/weather/clear.svg";
                    break;
                case 'Clouds':
                    image.src = "Assets/weather/clouds.svg";
                    break;
                case 'Rain':
                    image.src = "Assets/weather/rain.svg";
                    break;
                case 'Haze':
                    image.src = "Assets/weather/drizzle.svg";
                    break;
                case 'Snow':
                    image.src = "Assets/weather/snow.svg";
                    break;
                case 'Thunderstorm':
                    image.src = "Assets/weather/thunderstorm.svg";
                    break;
                default:
                    image.src = "Assets/weather/clouds.svg";
            }
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${parseInt(json.main.humidity)}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/s`;
        });
    }
});

