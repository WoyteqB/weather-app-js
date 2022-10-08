const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector("header button.search");
const closeAutosearchButton = document.querySelector("header button.close");
const displayWeather = document.querySelector("main .wrapper");
const searchWrap = document.querySelector(".search-wrap");

let showCityWeather = (city) =>{
    let errorTitle = "";
    let errorText = "";
    fetch(
        'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q='+
        city+'&apikey=stvXgfCdwJ2XzNAR0N6fppcGvPg4Sez0&language=pl-PL'
        )
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
        console.log(data)
        //setDisplayWeather(data);
    })
    .catch(err => {
        displayError(errorTitle, errorText)
    });
};

let showCitylist = (city) =>{
    let errorTitle = "";
    let errorText = "";
    fetch(
        'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q='+
        city+'&apikey=stvXgfCdwJ2XzNAR0N6fppcGvPg4Sez0&language=pl-PL'
        )
    .then( res => {
        //console.log(res);
        if(res.ok ){
            return res
        }else {
            errorTitle = "Błąd "+ res.status;
            errorText = res.statusText;
        }
        throw Error(res.status + " - Połączenie")
    })
    .then( (res) => {
        //console.log("JSON");
        return res.json();
    })
    .then( (data) => {
        //console.log(data, displayWeather);
        //console.log("DATA");
        //console.log(data)
        data.forEach(element => {
            console.log(element.LocalizedName+", "+element.AdministrativeArea.LocalizedName);
        });
        //setDisplayWeather(data);
    })
    .catch(err => {
        displayError(errorTitle, errorText)
        console.log(err);
    });
};

searchButton.addEventListener("click", ()=>{
    //showCityWeather(searchInput.value)
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
searchInput.addEventListener("input", (e)=>{
    if(searchInput.value.length > 1){
        //showCitylist(searchInput.value);
    }
})
searchInput.addEventListener("click", ()=>{
    searchWrap.classList.remove("close")
})
closeAutosearchButton.addEventListener("click", ()=>{
    searchWrap.classList.add("close")
})
