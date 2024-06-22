type WeatherInfoType = {
  [key: string]: {
    icon: string;
    emoji: string;
  };
};
export const WEEKDAYS: string[] = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

export const WEATHERINFO: WeatherInfoType = {
  "01d": { icon: "sunny day", emoji: "☀️" },
  "01n": { icon: "clear night", emoji: "🌙" },
  "02d": { icon: "few clouds", emoji: "🌤️" },
  "02n": { icon: "few clouds", emoji: "🌤️" },
  "03d": { icon: "scattered clouds", emoji: "🌥️" },
  "03n": { icon: "scattered clouds", emoji: "🌥️" },
  "04d": { icon: "broken clouds", emoji: "☁️" },
  "04n": { icon: "broken clouds", emoji: "☁️" },
  "09d": { icon: "shower rain", emoji: "🌧️" },
  "09n": { icon: "shower rain", emoji: "🌧️" },
  "10d": { icon: "rain", emoji: "🌦️" },
  "10n": { icon: "rain", emoji: "🌦️" },
  "11d": { icon: "thunderstorm", emoji: "⛈️" },
  "11n": { icon: "thunderstorm", emoji: "⛈️" },
  "13d": { icon: "snow", emoji: "🌨️" },
  "13n": { icon: "snow", emoji: "🌨️" },
  "50d": { icon: "mist", emoji: "🌫️" },
  "50n": { icon: "mist", emoji: "🌫️" },
};
