// querySelectors Picked City Title - date1 - icon1
var cityContainer = document.querySelector("#cityContainer")
var currentDate = document.querySelector("#currentDate")
var currentIcon = document.querySelector("#currentIcon")
var currentTemp = document.querySelector("#currentTemp")
var currentHumidity = document.querySelector("#currentHumidity")
var currentWind = document.querySelector("#currentWind")
var currentUvi = document.querySelector("#currentUvi")

// Submit vars
var cityFormEl = document.querySelector("#cityForm")
var cityInputEl = document.querySelector("#cityInput")

var displayToggleEl = document.querySelector("#displayToggle");
// displayToggleEl.style.display = "none";

// saveSearchedCities vars
var searchedCitiesEl = document.querySelector("#searchedCities")
var savedCities = [];

var currentDay = moment().format("MM-DD-YYYY");

// // Load Searched Cities
var loadSearchedCities = function() {
    savedCities = JSON.parse(localStorage.getItem("savedCities"));

    if (!savedCities) {
        savedCities = [];
    }

    for (var i = 0; i<savedCities.length; i++) {
        displaySearchedCities(savedCities[i]);
        fetchWeather(savedCities[savedCities.length - 1]);
    }
}


// Fetch Functions Start -> leads to displayWeather
var fetchWeather = function(pickedCity) {
    // API URL for Picked City
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather/?q=" + pickedCity + "&appid=86fcb44b6b11593f53514dda5d0a62ae";

    fetch(apiUrl).then(function(response) {
        // check if request was successful
        if(response.ok) {
            response.json().then(function(data) {
                // Clear City Name first then Display
                if (pickedCity.length === 0) {
                    cityContainer.textContent = "City not found."
                }
                cityContainer.textContent = "";
                cityContainer.textContent = data.name;

                let uvApiUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon +"&units=imperial&appid=86fcb44b6b11593f53514dda5d0a62ae"
                fetch(uvApiUrl).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                            // console.log(currentDay)
                            currentDate.textContent = "("+currentDay+")";

                            // console.log(data.current.weather[0].icon);
                            currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/"+ data.current.weather[0].icon +".png");

                            // console.log(data.current.temp)
                            currentTemp.textContent = "Temperature: "+data.current.temp+"";

                            // console.log(data.current.humidity)
                            currentHumidity.textContent = "Humidity: "+data.current.humidity+"";

                            // console.log(data.current.wind_speed)
                            currentWind.textContent = "Wind Speed: "+data.current.wind_speed+"";

                            // console.log(data.current.uvi)
                            currentUvi.textContent = "UV Index: "+data.current.uvi+"";

                            for (var i = 1; i < 6; i++) {
                                var forecastCard = $(".forecastCard[data-day='"+i+"']");
                                forecastCard.empty();

                                var cardDate = moment().add(i, 'days').format("MM-DD-YYYY");
                                // console.log(cardDate);
                                var forecastDate = document.createElement("p");
                                forecastDate.classList = "card-title";
                                forecastDate.textContent = cardDate;
                                forecastDate.setAttribute("data-day", i);
                                forecastCard.append(forecastDate);

                                // console.log(data.daily[i].weather[0].icon)
                                var iconContainer = document.createElement("p");
                                iconContainer.classList = "card-text icon-container";
                                var forecastIcon = document.createElement("img");
                                forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon +".png");
                                forecastIcon.setAttribute("data-day", i);
                                iconContainer.append(forecastIcon);
                                forecastCard.append(iconContainer);

                                // console.log(data.daily[i].temp.day)
                                var forecastTemp = document.createElement("p");
                                forecastTemp.classList = "card-text";
                                forecastTemp.textContent = data.daily[i].temp.day;
                                forecastTemp.setAttribute("data-day", i);
                                forecastCard.append(forecastTemp);

                                // console.log(data.daily[i].humidity)
                                var forecastHumidity = document.createElement("p");
                                forecastHumidity.classList = "card-text";
                                forecastHumidity.textContent = data.daily[i].humidity;
                                forecastHumidity.setAttribute("data-day", i);
                                forecastCard.append(forecastHumidity);

                                displayToggleEl.classList.remove("d-none");
                            }
                        })
                    }
                }).catch(function(error) {
                    alert("Error: " + response.statusText)
                })
                // displayWeather(data, pickedCity);
            }).catch(function(error) {
                alert("Error: " + response.statusText)
            })
        }
    })


}
// Fetch Functions End



// Form Submission -> leads to fetchWeather
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get the value from input element
    var city = cityInputEl.value.toLowerCase().trim()


    if (city) {
        fetchWeather(city);
        saveCity(city);
        displaySearchedCities(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.")
    }
};

// Save cities
var saveCity = function(city) {
    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities))
}

// Save searched cities
var displaySearchedCities = function(city) {
    // clear searchedCities Container
    $("#searchedCities").empty();

    for (var i = 0; i < savedCities.length ; i++) {
        var capitalizedCity = savedCities[i].charAt(0).toUpperCase()+savedCities[i].slice(1);
        // add <li>
        var cityListItem = document.createElement("li");
        cityListItem.classList = "list-group-item";
        cityListItem.textContent = capitalizedCity;
        cityListItem.setAttribute("data-savedCity-number", i)
        $("#searchedCities").append(cityListItem);
    }
}

// Clicked City from Saved List -> leads to fetchWeather
var clickCity = function(pickedCity) {};

// Load Cities from Local Storage
loadSearchedCities();
// displayWeather Function
var displayWeather = function(data, pickedCity) {};

// Click Events (citiesBtn & cityLi[data-city: #])
cityFormEl.addEventListener("submit", formSubmitHandler);


// Weather API ID (DELETE COMMENT PRIOR TO SUBMISSION)
// 86fcb44b6b11593f53514dda5d0a62ae
