const cityInput = document.getElementById("city");
let cityInputValue = cityInput.value;
const countryInput = document.getElementById("country");
let countryInputValue = countryInput.value;
const btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', showInformation);
let cityTitle = document.getElementById("city-title");
cityTitle.style.color = "#fff";
let countryCode = document.getElementById("country-code");
let weatherDescription = document.getElementById("description");
let weatherTemperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let weatherImg = document.querySelector(".img-icon");

async function getInformation() {
    try {
        let cityInputValue = cityInput.value;
        let countryInputValue = countryInput.value;
        let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInputValue},${countryInputValue}&appid=4b4bdcabdc6073559fcb852e42cf0837`);
        let response = await request.json();
        return response;
    }
    catch(e) {
        console.log(e.message);        
    }
}

async function showInformation() {
    toValidateCityInput();
    let information = await getInformation();
    btnSubmit.setAttribute("disabled", true);    
    if (information == undefined) cityTitle.textContent = 'Error, check your connection' + "!";
    else if (information.cod == "200") {
        cityTitle.style.color = "#fff";
        cityTitle.textContent = information.name + ", ";
        countryCode.textContent = information.sys.country;
        weatherDescription.textContent = information.weather[0].description;
        weatherTemperature.textContent = (information.main.temp).toPrecision(3)/10 + "°C";
        humidity.textContent = "Humidity: " + information.main.humidity + "%";
        let iconCode = information.weather[0].icon;
        let url = (`https://openweathermap.org/img/wn/${iconCode}@2x.png`);
        weatherImg.src = url;
        animate();
    }
    else if (information.cod == "404") {
        clearData();
        cityTitle.textContent = information.message + "!";
        cityTitle.style.color = "red";
    }
    else {
        cityTitle.textContent = 'Error';
    }
    btnSubmit.removeAttribute("disabled");
}

function toValidateCityInput() {
    if(cityInput.value === "") {
        cityInput.style.border = "2px solid red";
        evt.eventPrevent();
    }
    else {
        cityInput.style.border = "";
    }
}

function clearData() {
    countryCode.textContent = "";
    weatherDescription.textContent = "";
    weatherTemperature.textContent = "";
    humidity.textContent = "";
    weatherImg.src = "";
}

function animate() {
    let slideRight = {
        distance: '1500px',
        origin: 'right',
        opacity: null,
        delay: 1200,
        useDelay: 'always',
        viewFactor: 0.5 
    };

    let slideTop = {
        distance: '1400px', 
        origin: 'top',
        opacity: null,
        delay: 1300,
        useDelay: 'always'
    };

    let slideBottom = {
        distance: '1400px', 
        origin: 'bottom',
        opacity: null,
        delay: 1350,
        useDelay: 'always'
    };
    
    ScrollReveal().reveal(cityTitle, slideRight);
    ScrollReveal().reveal(countryCode, slideRight);
    ScrollReveal().reveal(weatherImg, slideTop);
    ScrollReveal().reveal(weatherDescription, {delay: 1300});
    ScrollReveal().reveal(weatherTemperature, slideTop);
    ScrollReveal().reveal(humidity, slideBottom);
}