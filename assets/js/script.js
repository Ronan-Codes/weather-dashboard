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

// Current Day var
var currentDay = moment().format("MM-DD-YYYY");

// Load Searched Cities
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather/?q=" + pickedCity + "&appid=86fcb44b6b11593f53514dda5d0a62ae";

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

                // Use lat and long of City to get weather information from One Call API of openweather
                var uvApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon +"&units=imperial&appid=86fcb44b6b11593f53514dda5d0a62ae";


                fetch(uvApiUrl).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                            // Display Current Date
                            currentDate.textContent = "("+currentDay+")";

                            // Display Current Icon
                            currentIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+ data.current.weather[0].icon +".png");

                            // Display Current Temperature
                            currentTemp.textContent = "Temperature: "+data.current.temp+" \u00B0F";

                            // Display Current Humidity
                            currentHumidity.textContent = "Humidity: "+data.current.humidity+"%";

                            // Display Current Wind Speed
                            currentWind.textContent = "Wind Speed: "+data.current.wind_speed+" MPH";

                            // Display Current UVI
                            currentUvi.textContent = data.current.uvi;

                            for (var i = 1; i < 6; i++) {
                                var forecastCard = $(".forecastCard[data-day='"+i+"']");
                                forecastCard.empty();

                                // Display Dates for 5-Day Forecast
                                var cardDate = moment().add(i, 'days').format("MM-DD-YYYY");
                                var forecastDate = document.createElement("p");
                                forecastDate.classList = "card-title font-bigger";
                                forecastDate.textContent = cardDate;
                                forecastDate.setAttribute("data-day", i);
                                forecastCard.append(forecastDate);

                                // Display Icon for 5-Day Forecast
                                var iconContainer = document.createElement("p");
                                iconContainer.classList = "card-text icon-container";
                                var forecastIcon = document.createElement("img");
                                forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon +".png");
                                forecastIcon.setAttribute("data-day", i);
                                iconContainer.append(forecastIcon);
                                forecastCard.append(iconContainer);

                                // Display Temp for 5-Day Forecast
                                var forecastTemp = document.createElement("p");
                                forecastTemp.classList = "card-text";
                                forecastTemp.textContent = "Temp: " + data.daily[i].temp.day + " \u00B0F";
                                forecastTemp.setAttribute("data-day", i);
                                forecastCard.append(forecastTemp);

                                // Display Humidity for 5-Day Forecast
                                var forecastHumidity = document.createElement("p");
                                forecastHumidity.classList = "card-text";
                                forecastHumidity.textContent = "Himudity: " + data.daily[i].humidity + "%";
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

// Save cities to Local Storage
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
        var cityListItem = document.createElement("button");
        cityListItem.classList = "list-group-item city-item";
        cityListItem.textContent = capitalizedCity;
        cityListItem.setAttribute("data-savedCity-number", i)
        cityListItem.setAttribute("type", "submit")
        $("#searchedCities").append(cityListItem);
    }
}

// Load Cities from Local Storage
loadSearchedCities();


// Click Events
$(".list-group").on("click", "button", function() {
    var text = $(this).text().trim();

    fetchWeather(text);
})

cityFormEl.addEventListener("submit", formSubmitHandler);

// Refresh Page Every 30 minutes
setInterval(function() {
    window.location.reload();
  }, 1000*60*30);
