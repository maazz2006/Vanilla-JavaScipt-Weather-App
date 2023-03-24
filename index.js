const container= document.querySelector(' .container');
const search= document.querySelector(' .searchbox button');
const weatherBox= document.querySelector(' .weather-box');
const weatherDetails= document.querySelector(' .weather-details');
const error404= document.querySelector(' .notfound');

const image = document.querySelector(".weather-box img");
const temperatur = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');


search.addEventListener('click',()=>{
    const API='b12a56064b124ab5b5fc5b78f383f11f';

    const city= document.querySelector('.searchbox input').value
    if (city==='')
        return;
 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}%20&units=metric&appid=${API}`).
    then(response=>response.json()).
    then(json=>{
        if(json.cod==='404'){
            container.style.height='400px';
            weatherBox.style.display='none';
            weatherDetails.style.display='none'; 
            error404.style.display='block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display='none';
        error404.classList.remove('fadeIn');


        switch (json.weather[0].main){
            case 'Clear':
                image.src="images/clear.png";
                break;
            case 'Rain':
                image.src="images/rain.png";
                break;
            case 'Snow':
                image.src="images/snow.png";
                break;
            case 'Clouds':
                image.src="images/cloud.png";
                break;
            case 'Haze':
                image.src="images/mist.png";
                break;
            default:
                image.src="";
        }
        temperatur.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${(json.weather[0].description)}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}<span>Km/hr</span>`;
        weatherBox.style.diplay = '';
        weatherDetails.style.display='';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height='590px';
    });
 
});