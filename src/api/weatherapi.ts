import { CityData } from "@/components/ShowLocations";
import { debounce } from "lodash";

export type weatherInfo = {
  location: string;
  country: string;
  latitude: number;
  longitude: number;
  weather: {
    temp: number;
    humidity: number;
  };
};

const fetchWeather = debounce(
  async (cityName: CityData) => {
    const currentWeatherFetch = `${process.env.NEXT_PUBLIC_ANALYTICS_CURRENT_WEATHER_API}?lat=${cityName.latitude}&lon=${cityName.longitude}&appid=${process.env.NEXT_PUBLIC_ANALYTICS_WEATHER_API_KEY}&units=metric`;

    const forecastWeatherFetch = `${process.env.NEXT_PUBLIC_ANALYTICS_FORECAST_WEATHER_API}?lat=${cityName.latitude}&lon=${cityName.longitude}&appid=${process.env.NEXT_PUBLIC_ANALYTICS_WEATHER_API_KEY}&units=metric`;

    const options = {
      method: "GET",
    };
    try {
      const responses = await Promise.all([
        fetch(currentWeatherFetch, options),
        fetch(forecastWeatherFetch, options),
      ]);

      let currentWeatherResponse = await responses[0].json();
      const forecastResponse = await responses[1].json();

      currentWeatherResponse = {
        ...currentWeatherResponse,
        country: cityName.country,
        pop: forecastResponse["list"][0].pop,
      };

      localStorage.setItem(
        "currentWeather",
        JSON.stringify(currentWeatherResponse),
      );
      localStorage.setItem("forecastWeather", JSON.stringify(forecastResponse));

      const weatherData = {
        location: cityName.name,
        country: cityName.country,
        latitude: cityName.latitude,
        longitude: cityName.longitude,
        weather: {
          temp: currentWeatherResponse.main.temp,
          humidity: currentWeatherResponse.main.humidity,
        },
      };

      await fetch("/api/weatherinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(weatherData),
      });
    } catch (err) {
      console.log(err);
    }
  },
  600,
  {
    trailing: true,
  },
);
export default fetchWeather;
