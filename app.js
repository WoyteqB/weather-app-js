const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector("header button.search");
const displayWeather = document.querySelector("main .wrapper");

let showCityWeather = (city) =>{
    let errorTitle = "";
    let errorText = "";
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=f0c515d63a64608d97e703d0f0121976&lang=pl&units=metric ')
    .then( res => {
        console.log(res);
        if(res.ok ){
            return res
        }else {
            errorTitle = "Błąd "+ res.status;
            errorText = res.statusText;
        }
        throw Error(res.status + " - Połączenie")
    })
    .then( (res) => {
        console.log("JSON");
        return res.json();
    })
    .then( (data) => {
        //console.log(data, displayWeather);
        console.log("DATA");
        setDisplayWeather(data);
    })
    .catch(err => {
        displayError(errorTitle, errorText)
    });
};

searchButton.addEventListener("click", ()=>{
    showCityWeather(searchInput.value)
});

let setDisplayWeather = (data) => {
    displayWeather.innerHTML = 'Temperatura w ' + data.name+ ' wynosi ' + Math.round(data.main.temp,0) + "°C";
};

let displayError = (title, text) =>{

let errorContainer = document.createElement("div");
errorContainer.className = "error-container";
errorContainer.innerHTML = '<div class="error-container">'+
'<div class="error">'+
    '<div class="title">'+
        '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>'+
        '<h3>'+ title +'</h3>'+
    '</div>'+
    '<div class="content">'+
        text+
    '</div>'+
    '<button>'+
        '<i class="fa fa-times" aria-hidden="true"></i>'+
    '</button>'+
'</div>'+
'</div>';

document.querySelector('body').appendChild(errorContainer);
document.querySelector('.error-container button').addEventListener("click", ()=>{
    document.querySelector('body .error-container').remove();
})

}
function activeteCitySearch(){
    let option = {
        types: ['(cities)'],
        componentRestrictions: { country: ["pl"],}
    }
    new google.maps.places.Autocomplete(searchInput, option);
}

