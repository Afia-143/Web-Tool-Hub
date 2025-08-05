const apiKey = "678ffcf8cde003dbc679b8108c64847c";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); 
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status === 404){
        document.querySelector(".error").style.display="block";
        document.querySelector(".weather").style.display="none";
    }
    else{
        let data = await response.json();

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if(data.weather[0].main === "Clouds"){
            weatherIcon.src="images/clouds.png";
        }
        else if(data.weather[0].main === "Clear"){
            weatherIcon.src="images/clear.ico";
        }
        else if(data.weather[0].main === "Rain"){
            weatherIcon.src="images/rain.webp";
        }
        else if(data.weather[0].main === "Drizzle"){
            weatherIcon.src="images/drizzle.webp";
        }
        else if(data.weather[0].main === "Mist"){
            weatherIcon.src="iimages/mist.jpg";
        }
        else if(data.weather[0].main === "Thunderstorm"){
            weatherIcon.src="images/rain.webp";
        }

        document.querySelector(".error").style.display="none";
        document.querySelector(".weather").style.display="flex";
    }
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})