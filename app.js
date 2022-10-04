const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector("header button.search");
const displayWeather = document.querySelector("main .wrapper");

let showCityWeather = (city) =>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=f0c515d63a64608d97e703d0f0121976&lang=pl&units=metric ')
    .then( res => {
        console.log(res);
        if(res.ok ){
            return res
        }else if(res.status === 404){
           console.log("Nie znaleziono miasta") 
        }
        throw Error(res.status + " - 1")
        
    })
    .then( (res) => res.json())
    .then( (data) => {
        //console.log(data, displayWeather);
        setDisplayWeather(data);
    })
    .catch(err => console.log("Błąd "+err));
};

searchButton.addEventListener("click", ()=>{
    showCityWeather(searchInput.value)
});

let setDisplayWeather = (data) => {
    displayWeather.innerHTML = 'Temperatura w ' + data.name+ ' wynosi ' + Math.round(data.main.temp,0) + "°C";
};