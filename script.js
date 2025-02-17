document.addEventListener("DOMContentLoaded", function () {
    const apikey = "79ad2f3a8a1003d631cdb3429ca97e98";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const SearchBox = document.querySelector(".search input");
    const SearchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon")

    if (!SearchBox || !SearchBtn) {
        console.error("Elements not found! Check your HTML structure.");
        return;
    }

    async function CheckWeather(city) {
        try {
            const response = await fetch(apiURL + city + `&appid=${apikey}`);
            if (!response.ok) throw new Error(`City not found: ${city}`);
            var data = await response.json();

            console.log(data);

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png"
            }

            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png"
            }

            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png"
            }

            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png"
            }

            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png"
            }

        document.querySelector(".weather").style.display = "block"

        } catch (error) {
            alert(error.message);
        }
    }

    SearchBtn.addEventListener("click", () => {
        CheckWeather(SearchBox.value);
    });

    SearchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            CheckWeather(SearchBox.value);
        }
    });
});
