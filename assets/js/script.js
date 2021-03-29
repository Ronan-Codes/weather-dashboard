// querySelectors Picked City Title - date1 - icon1
var cityContainer = $("#cityContainer");
var date1 = $("#date1");
var icon1 = $("#icon1");

// querySelectors Picked City weather info
var tempContainer1 = $("#tempContainer1");
var humidityContainer1 = $("#humidityContainer1");
var windContainer = $("#windContainer");
var uvContainer = $("#uvContainer");

// querySelectors 5-Day Forecast: date2
var date1 = $("#date2");
var icon1 = $("#icon2");
var tempContainer1 = $("#tempContainer2");
var humidityContainer1 = $("#humidityContainer2");

// querySelectors 5-Day Forecast: date3
var date1 = $("#date3");
var icon1 = $("#icon3");
var tempContainer1 = $("#tempContainer3");
var humidityContainer1 = $("#humidityContainer3");

// querySelectors 5-Day Forecast: date4
var date1 = $("#date4");
var icon1 = $("#icon4");
var tempContainer1 = $("#tempContainer4");
var humidityContainer1 = $("#humidityContainer4");

// querySelectors 5-Day Forecast: date5
var date1 = $("#date5");
var icon1 = $("#icon5");
var tempContainer1 = $("#tempContainer5");
var humidityContainer1 = $("#humidityContainer5");

// querySelectors 5-Day Forecast: date6
var date1 = $("#date6");
var icon1 = $("#icon6");
var tempContainer1 = $("#tempContainer6");
var humidityContainer1 = $("#humidityContainer6");

// querySelectors for City Form
var cityInput = $("#cityInput");
var cityBtn = $("#cityBtn");
var citiesContainer = $("#citiesContainer");

var currentDay = moment().format("MM-DD-YYYY");


// Fetch Functions Start -> leads to displayWeather
var fetchWeather = function(pickedCity) {
    // API URL for Picked City
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather/?q=" + pickedCity + "&appid=86fcb44b6b11593f53514dda5d0a62ae";

    fetch(apiUrl).then(function(response) {
        // check if request was successful
        if(response.ok) {
            response.json().then(function(data) {

                var uvApiUrl = "http://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon +"&appid=86fcb44b6b11593f53514dda5d0a62ae"
                fetch(uvApiUrl).then(function(response) {
                    if(response.ok) {
                        response.json().then(function(data) {
                            // console.log(currentDay)
                            // console.log(data.current.weather[0].icon);
                            // console.log(data.current.temp)
                            // console.log(data.current.humidity)
                            // console.log(data.current.wind_speed)
                            // console.log(data.current.uvi)
                            // console.log(data)
                            debugger;
                            for (var i = 1; i < 6; i++) {
                                var forecastCard = $(".forecastCard[data-day='"+i+"']");

                                var cardDate = moment().add(i, 'days').format("MM-DD-YYYY");
                                // console.log(cardDate);
                                var forecastDate = document.createElement("p");
                                forecastDate.classList = "card-title";
                                forecastDate.textContent = cardDate;
                                forecastDate.setAttribute("data-day", i);
                                forecastCard.append(forecastDate);

                                // console.log(data.daily[i].weather[0].icon)
                                var forecastIcon = document.createElement("img");
                                forecastIcon.classList = "card-text";
                                forecastIcon.setAttribute("src", "http://openweathermap.org/img/wn/"+ data.daily[i].weather[0].icon +".png");
                                forecastIcon.setAttribute("data-day", i);
                                forecastCard.append(forecastIcon);

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

    // var fiveDayUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + pickedCity + "&cnt=6&appid=86fcb44b6b11593f53514dda5d0a62ae";
    // fetch(fiveDayUrl).then(function(response) {
    //     if(response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data)
    //         })
    //     }
    // })
}
// Fetch Functions End

// Form Submission -> leads to fetchWeather
var formSubmitHandler = function(pickedCity) {};

// Clicked City from Saved List -> leads to fetchWeather
var clickCity = function(pickedCity) {};

// displayWeather Function
var displayWeather = function(data, pickedCity) {};

// Click Events (citiesBtn & cityLi[data-city: #])

fetchWeather("atlanta")

// Weather API ID (DELETE COMMENT PRIOR TO SUBMISSION)
// 86fcb44b6b11593f53514dda5d0a62ae
