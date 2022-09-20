
function search() {
    const searchInput = document.querySelector('#searchInput');

    let key = "ed1f0c8cff78acec3459f425c7493728"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${key}`
    if (searchInput != "") {
        fetch(url).then(function (res) {
            return res.json()
        }).then(function (res) {
            // console.log(res.coord)
            sevenDaysFunc(res.coord.lat, res.coord.lon)
            display(res)
        }).catch(function (err) {
            console.log(err)
        })
    }
    else {
        alert("Please Enter City Name")
    }
    function sevenDaysFunc(lat, lon) {
        let key = "ed1f0c8cff78acec3459f425c7493728"
        let sevenDaysUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${key}`

        fetch(sevenDaysUrl).then(function (res) {
            return res.json()
        }).then(function (res) {
            console.log(res.daily)
            displysevenDays(res.daily)
        }).catch(function (err) {
            console.log(err)
        })
    }

}

// append data
function display(data) {

    const weather = document.querySelector('#weather');
    const allDetails = document.querySelector('#allDetails');

    weather.innerHTML = ""

    const sw = document.querySelector('#sw');
    sw.style.display = "none"

    const weather2 = document.querySelector('#weather2');
    weather2.innerHTML = ""

    const tempDiv = document.createElement('div');
    tempDiv.setAttribute("id", "tempDiv")

    const temp = document.createElement('h1');
    temp.setAttribute("id", "temp")
    let maintemp = (data.main.temp - 273.15).toFixed(2)
    temp.innerText = maintemp + " °C"

    const warmOrNot = document.createElement('h3');
    warmOrNot.innerText = ""
    tempDiv.append(temp, warmOrNot)

    if (maintemp < 24) {
        warmOrNot.innerText = "Cool"
        warmOrNot.style.color = "Green"
    }
    else if (maintemp <= 34 && maintemp >= 25) {
        warmOrNot.innerText = "Normal"
        warmOrNot.style.color = "Orange"
    }

    else if (maintemp >= 35) {
        warmOrNot.innerText = "Too Hot"
        warmOrNot.style.color = "red"
    }
    const city = document.createElement('h3');
    city.setAttribute("id", "city")
    city.innerText = data.name + ", " + data.sys.country

    const temp_minDiv = document.createElement('div');
    temp_minDiv.setAttribute("id", "temp_minDiv")

    const temp_minIcon = document.createElement('p');
    temp_minIcon.setAttribute("class", "icon")
    temp_minIcon.innerHTML = `<i class='fas fa-temperature-low'></i>`

    const temp_min = document.createElement('p');
    temp_min.setAttribute("class", "smallDetails")
    temp_min.innerText = "Min Temp: " + (data.main.temp_min - 273.15).toFixed(2) + "°C"

    temp_minDiv.append(temp_minIcon, temp_min)

    const temp_maxDiv = document.createElement('div');
    temp_maxDiv.setAttribute("id", "temp_maxDiv")

    const temp_maxIcon = document.createElement('p');
    temp_maxIcon.setAttribute("class", "icon")
    temp_maxIcon.innerHTML = `<i class='fas fa-temperature-high'></i>`

    const temp_max = document.createElement('p');
    temp_max.setAttribute("class", "smallDetails")
    temp_max.innerText = "Max Temp: " + (data.main.temp_max - 273.15).toFixed(2) + "°C"

    temp_maxDiv.append(temp_maxIcon, temp_max)

    const humidityDiv = document.createElement('div');
    humidityDiv.setAttribute("id", "humidityDiv")

    const humidityIcon = document.createElement('p');
    humidityIcon.setAttribute("class", "icon")

    humidityIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moisture" viewBox="0 0 16 16">
    <path d="M13.5 0a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V7.5h-1.5a.5.5 0 0 0 0 1H15v2.75h-.5a.5.5 0 0 0 0 1h.5V15h-1.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 .5-.5V.5a.5.5 0 0 0-.5-.5h-2zM7 1.5l.364-.343a.5.5 0 0 0-.728 0l-.002.002-.006.007-.022.023-.08.088a28.458 28.458 0 0 0-1.274 1.517c-.769.983-1.714 2.325-2.385 3.727C2.368 7.564 2 8.682 2 9.733 2 12.614 4.212 15 7 15s5-2.386 5-5.267c0-1.05-.368-2.169-.867-3.212-.671-1.402-1.616-2.744-2.385-3.727a28.458 28.458 0 0 0-1.354-1.605l-.022-.023-.006-.007-.002-.001L7 1.5zm0 0-.364-.343L7 1.5zm-.016.766L7 2.247l.016.019c.24.274.572.667.944 1.144.611.781 1.32 1.776 1.901 2.827H4.14c.58-1.051 1.29-2.046 1.9-2.827.373-.477.706-.87.945-1.144zM3 9.733c0-.755.244-1.612.638-2.496h6.724c.395.884.638 1.741.638 2.496C11 12.117 9.182 14 7 14s-4-1.883-4-4.267z"/>
  </svg>`

    const humidity = document.createElement('p');
    humidity.setAttribute("class", "smallDetails")
    humidity.innerText = "Humidity: " + data.main.humidity + "%"

    humidityDiv.append(humidityIcon, humidity)

    const cloudsDiv = document.createElement('div');
    cloudsDiv.setAttribute("id", "cloudsDiv")

    const cloudsIcon = document.createElement('p');
    cloudsIcon.setAttribute("class", "icon")
    cloudsIcon.innerHTML = `<i class="fa fa-cloud"></i>`

    const clouds = document.createElement('p');
    clouds.setAttribute("class", "smallDetails")
    clouds.innerText = "Clouds: " + data.clouds.all

    cloudsDiv.append(cloudsIcon, clouds)

    const pressureDiv = document.createElement('div');
    pressureDiv.setAttribute("id", "pressureDiv")

    const pressureIcon = document.createElement('p');
    pressureIcon.setAttribute("class", "icon")
    pressureIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-fog2" viewBox="0 0 16 16">
    <path d="M8.5 4a4.002 4.002 0 0 0-3.8 2.745.5.5 0 1 1-.949-.313 5.002 5.002 0 0 1 9.654.595A3 3 0 0 1 13 13H.5a.5.5 0 0 1 0-1H13a2 2 0 0 0 .001-4h-.026a.5.5 0 0 1-.5-.445A4 4 0 0 0 8.5 4zM0 8.5A.5.5 0 0 1 .5 8h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
  </svg>`

    const pressure = document.createElement('p');
    pressure.setAttribute("class", "smallDetails")
    pressure.innerText = "Pressure: " + data.main.pressure

    pressureDiv.append(pressureIcon, pressure)

    const sunriseDiv = document.createElement('div');
    sunriseDiv.setAttribute("id", "sunriseDiv")

    const sunriseIcon = document.createElement('p');
    sunriseIcon.setAttribute("class", "icon")
    sunriseIcon.innerHTML = `<i class='fas fa-cloud-sun'></i>`

    const sunrise = document.createElement('p');
    sunrise.setAttribute("class", "smallDetails")
    sunrise.innerText = "Sunrise: " + convertTime(data.sys.sunrise) + " am"

    sunriseDiv.append(sunriseIcon, sunrise)

    const sunsetDiv = document.createElement('div');
    sunsetDiv.setAttribute("id", "sunsetDiv")

    const sunsetIcon = document.createElement('p');
    sunsetIcon.setAttribute("class", "icon")
    sunsetIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sunset-fill" viewBox="0 0 16 16">
    <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10zm13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z"/>
  </svg>`

    const sunset = document.createElement('p');
    sunset.setAttribute("class", "smallDetails")
    sunset.innerText = "Sunset: " + convertTime(data.sys.sunset) + " pm"

    sunsetDiv.append(sunsetIcon, sunset)

    const feels_likeDiv = document.createElement('div');
    feels_likeDiv.setAttribute("id", "feels_likeDiv")

    const feels_likeIcon = document.createElement('p');
    feels_likeIcon.setAttribute("class", "icon")
    feels_likeIcon.innerHTML = `<i class='fas fa-meteor'></i>`

    const feels_like = document.createElement('p');
    feels_like.setAttribute("class", "smallDetails")
    feels_like.innerText = "Feels Like: " + data.main.feels_like

    feels_likeDiv.append(feels_likeIcon, feels_like)


    const visibilityDiv = document.createElement('div');
    visibilityDiv.setAttribute("id", "visibilityDiv")

    const visibilityIcon = document.createElement('p');
    visibilityIcon.setAttribute("class", "icon")
    visibilityIcon.innerHTML = `<i class="fa-duotone fa-eye"></i>`

    const visibility = document.createElement('p');
    visibility.setAttribute("class", "smallDetails")
    visibility.innerText = "Visibility: " + data.visibility

    visibilityDiv.append(visibilityIcon, visibility)


    const windDiv = document.createElement('div');
    windDiv.setAttribute("id", "windDiv")

    const windIcon = document.createElement('p');
    windIcon.setAttribute("class", "icon")
    windIcon.innerHTML = `<i class="fa-solid fa-wind"></i>`

    const wind = document.createElement('p');
    wind.setAttribute("class", "smallDetails")
    wind.innerText = "Wind: " + data.wind.speed + "km/h"

    windDiv.append(windIcon, wind)

    const gmap_canvas = document.querySelector('#gmap_canvas');
    gmap_canvas.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`


    weather2.append(sunriseDiv, sunsetDiv, feels_likeDiv, visibilityDiv, windDiv)
    weather.append(tempDiv, city, temp_minDiv, temp_maxDiv, humidityDiv, cloudsDiv, pressureDiv)
}

// get latitude and longitude
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        liveFun(latitude, longitude)
        const CurrentLocation = document.querySelector('#CurrentLocation');
        CurrentLocation.addEventListener("click", function () {
            liveFun(latitude, longitude)
        })
    }
}

// convert into time
function convertTime(unixTime) {
    let dt = new Date(unixTime * 1000)
    let h = dt.getHours()
    let m = "0" + dt.getMinutes()
    let t = h + ":" + m.substr(-2)
    return t
}

// current location funciton 



function liveFun(lat, lon) {
    let key = "ed1f0c8cff78acec3459f425c7493728"
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
    fetch(url).then(function (res) {
        return res.json()
    }).then(function (res) {
        display(res)
    }).catch(function (err) {
        console.log(err)
    })
    getLocationWeather()
}

// function for seven days weather 
let i = 0;
function displysevenDays(data) {
    const sevenDays = document.querySelector('#sevenDays');
    sevenDays.innerText = ""
    let daysarr = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday"]

    data.forEach(function (elem) {

        const daysDiv = document.createElement('div');
        daysDiv.setAttribute("id", "daysDiv")
        sevenDays.append(daysDiv)

        const days = document.createElement('p');
        days.innerText = daysarr[i++]
        if (i == 8) {
            i = 0
        }

        const icon = document.createElement('img');
        icon.src = `http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`

        const maxTemp = document.createElement('p');
        maxTemp.innerText = `Max Temp: ${(elem.temp.max - 273.15).toFixed(2)} °`

        const minTemp = document.createElement('p');
        minTemp.innerText = `Max Temp: ${(elem.temp.min - 273.15).toFixed(2)} °`

        daysDiv.append(days, icon, maxTemp, minTemp)
    })

}
