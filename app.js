const searchInput = document.querySelector("#city-name");
const searchButton = document.querySelector("header button.search");
const closeAutosearchButton = document.querySelector("header button.close");
const displayWeather = document.querySelector("main .wrapper");
const searchWrap = document.querySelector(".search-wrap");
const autocomplete = document.querySelector(".search-wrap .input-autocomplate ul")

const cityName = document.querySelector(".weather-city .city h2");
const cityDate = document.querySelector(".weather-city .first-line .date");
const cityDayStart = document.querySelector(".weather-city .first-line .sun .day-start");
const cityDayEnd = document.querySelector(".weather-city .first-line .sun .day-end");
const cityIcon = document.querySelector(".weather-city .secound-line .icon img");
const cityTemp = document.querySelector(".weather-city .secound-line .temp span");
const cityDesc = document.querySelector(".weather-city .secound-line .details .desc");
const cityTempFeel = document.querySelector(".weather-city .secound-line .details .feel .value");
const cityPressure = document.querySelector(".weather-city .secound-line .details .pressure .value");
const cityWind= document.querySelector(".weather-city .secound-line .details .wind .value");

let showCityWeather = (cityId) =>{
    let errorTitle = "";
    let errorText = "";
    let city;
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+cityId+'&lang=pl&appid=f0c515d63a64608d97e703d0f0121976&units=metric'
        )
    .then( res => {
        console.log(res);
        if(res.ok ){
            return res
        }else {
            errorTitle = "Błąd "+ res.Code;
            errorText = res.Message;
        }
        throw Error(res)
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
        setCityDetails(data);
    })
    .catch(err => {
        displayError(errorTitle, errorText)
    });
    
};

// let showCitylist = (city) =>{
//     let errorTitle = "";
//     let errorText = "";
//     // fetch(
//     //     'http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q='+
//     //     city+'&apikey=stvXgfCdwJ2XzNAR0N6fppcGvPg4Sez0&language=pl-PL'
//     //     , {mode: 'no-cors'})
//     // .then( res => {
//     //     //console.log(res);
//     //     if(res.ok ){
//     //         return res
//     //     }else {
//     //         errorTitle = "Błąd "+ res.status;
//     //         errorText = res.statusText;
//     //     }
//     //     throw Error(res.status + " - Połączenie")
//     // })
//     // .then( (res) => {
//     //     //console.log("JSON");
//     //     return res.json();
//     // })
//     // .then( (data) => {
//     //     //console.log(data, displayWeather);
//     //     //console.log("DATA");
//     //     console.log(data)
//     //     autocomplete.innerHTML = "";
//     //     data.forEach(element => {
//     //         if(element.Country.ID === "PL"){
//     //             //console.log(element.LocalizedName+", "+element.AdministrativeArea.LocalizedName);
//     //             let li = document.createElement("li");
//     //             li.innerHTML = element.LocalizedName+", "+element.AdministrativeArea.LocalizedName;
//     //             li.addEventListener("click",()=>{
//     //                 // showCityWeather(element.Key)
//     //                 //console.log(element)
//     //                 //showCityWeather(element.Key)
//     //             })
//     //             autocomplete.appendChild(li);
//     //         }
//     //     });
//     //     //setDisplayWeather(data);
//     // })
//     // .catch(err => {
//     //     displayError(errorTitle||"Błąd aplikacji", errorText + " " + err)
//     //     console.log(err);
//     // });
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': '94cb7370bamshbcd007e451dee8cp164e08jsnbb844ff17ca6',
//             'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//         }
//     };
    
//     fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities?countryIds=pl&sort=population&languageCode=en&minPopulation=500&asciiMode=true&types=CITY&namePrefix='+city, options)
//         .then(response => response.json())
//         .then(response => {
//             console.log(response)
//             autocomplete.innerHTML = "";
//             response.data.forEach(element => {
//                 let li = document.createElement("li");
//                 li.innerHTML = element.city+", "+element.region;
//                 li.addEventListener("click",()=>{
//                     showCityWeather(element.city)
//                 })
//                 autocomplete.appendChild(li);
            
//             });
//         })
//         .catch(err => console.error(err));
// };

searchButton.addEventListener("click", ()=>{
    showCityWeather(searchInput.value);
    searchInput.value="";
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


// searchInput.addEventListener("input", (e)=>{
//     if(searchInput.value.length > 1){
//         showCitylist(searchInput.value);
//     }
// })
// searchInput.addEventListener("click", ()=>{
//     searchWrap.classList.remove("close")
// })
// closeAutosearchButton.addEventListener("click", ()=>{
//     searchWrap.classList.add("close")
// })

let setCityDetails = (city) => {
    console.log("city")
    console.log(city);
    cityName.innerHTML = city.name;
    let dateNow = new Date(city.dt *1000);
    cityDate.innerHTML = dateNow.getDate()+"-"+ (dateNow.getMonth()+1) +"-"+dateNow.getFullYear();
    dateNow = new Date(city.sys.sunrise *1000);
    cityDayStart.innerHTML = dateNow.getHours()+":"+ (String(dateNow.getMinutes()).length>1?dateNow.getMinutes():"0"+dateNow.getMinutes());
    dateNow = new Date(city.sys.sunset *1000);
    cityDayEnd.innerHTML = dateNow.getHours()+":"+ (String(dateNow.getMinutes()).length>1?dateNow.getMinutes():"0"+dateNow.getMinutes());
    console.log(city.weather.icon);
    cityIcon.src = "http://openweathermap.org/img/wn/"+city.weather[0].icon+"@2x.png";
    cityIcon.alt = city.weather[0].description;
    cityTemp.innerHTML = Math.round(city.main.temp)+"°C";
    cityDesc.innerHTML = city.weather[0].description;
    cityTempFeel.innerHTML = Math.round(city.main.feels_like)+"°C";
    cityPressure.innerHTML = city.main.pressure+" hPa";
    cityWind.innerHTML = city.wind.speed +" km/h";
} 


function activeteCitySearch(){
    let option = {
        types: ['(cities)'],
        componentRestrictions: { country: ["pl"],}
    }
    new google.maps.places.Autocomplete(searchInput, option);
}
//setCityDetails(showCityWeather("Warszawa"));
console.log("Warszawa");
showCityWeather("Warszawa");