document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded!");

    const apikey = "79ad2f3a8a1003d631cdb3429ca97e98";
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.getElementById("city-input");
    const searchBtn = document.getElementById("search-btn");
    const weatherContainer = document.getElementById("weather-container");
    const weatherIcon = document.getElementById("weather-icon");

    // Weather icon mapping
    const weatherImages = {
        "Clouds": "images/clouds.png",
        "Clear": "images/clear.png",
        "Rain": "images/rain.png",
        "Drizzle": "images/drizzle.png",
        "Mist": "images/mist.png",
        "Snow": "images/snow.png",
        "Thunderstorm": "images/thunderstorm.png"
    };

    async function checkWeather(city) {
        if (!city) {
            alert("⚠️ Please enter a city name!");
            return;
        }

        try {
            console.log(`Fetching weather data for: ${city}`);
            const response = await fetch(apiURL + city + `&appid=${apikey}`);
            if (!response.ok) {
                throw new Error(`❌ City not found: ${city}`);
            }

            const data = await response.json();
            console.log("✅ Data received:", data);

            document.getElementById("city").textContent = data.name;
            document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";
            document.getElementById("humidity").textContent = data.main.humidity + "%";
            document.getElementById("wind").textContent = data.wind.speed + " km/h";

            // Update weather icon
            weatherIcon.src = weatherImages[data.weather[0].main] || "images/default.png";

            // Show weather with animation
            weatherContainer.style.display = "block";
            setTimeout(() => {
                weatherContainer.style.opacity = "1";
            }, 200);

        } catch (error) {
            console.error(error.message);
            alert(error.message);
        }
    }

    // 🌟 Fix: Start with hidden weather
    weatherContainer.style.display = "none";
    weatherContainer.style.opacity = "0";

    // Event Listeners
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value.trim());
    });

    searchBox.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value.trim());
        }
    });
});
