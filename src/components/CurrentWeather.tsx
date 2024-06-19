import { formatDate } from "@/lib/utils";
import {
  MapPin
} from "lucide-react";
import LottiePlayer from "./LottiePlayer";

const CurrentWeather = () => {
  // sample data
  const obj = {
    coord: {
      lon: 81.2833,
      lat: 24.5167,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 31.77,
      feels_like: 33.08,
      temp_min: 31.77,
      temp_max: 31.77,
      pressure: 997,
      humidity: 46,
      sea_level: 997,
      grnd_level: 964,
    },
    visibility: 10000,
    wind: {
      speed: 6.15,
      deg: 238,
      gust: 12.35,
    },
    clouds: {
      all: 100,
    },
    dt: 1718826605,
    sys: {
      country: "IN",
      sunrise: 1718840806,
      sunset: 1718889967,
    },
    timezone: 19800,
    id: 1258182,
    name: "Rewa",
    cod: 200,
  };

  return (
    <div className="mb-20 mt-20 min-h-fit">
      <div className="mx-auto h-80 w-72 rounded-lg bg-white/20 p-2 shadow-inner shadow-white drop-shadow-xl transition-all duration-700">
        <div className="relative">
          <div className="mb-5 flex w-full justify-between">
            <span className="ml-11">Night</span>
            <div className="flex gap-1">
              <span className="text-end text-xl">{obj.name}</span>
              <MapPin className="text-zinc-500" />
            </div>
          </div>
          <div className="absolute -left-16 -top-10 w-36">
            <LottiePlayer srcPath="/night.lottie" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-96">
            <LottiePlayer srcPath="/sunny-cloudy.lottie" />
          </div>
          <h2 className="text-3xl">
            {obj.main.temp} <sup>o</sup>C
          </h2>
          <span>{formatDate(obj.dt)!}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
