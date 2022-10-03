const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector(".weather-app-container button.search");

let showCityWeather = (city) =>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=f0c515d63a64608d97e703d0f0121976&lang=pl&units=metric ')
    .then( (res) => res.json())
    .then( (data) => console.log(data));
};

searchButton.addEventListener("click", ()=>{
    showCityWeather(searchInput.value)
});