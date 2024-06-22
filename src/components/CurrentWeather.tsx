"use client";
import { cn, formatDate } from "@/lib/utils";
import { MapPin } from "lucide-react";
import LottiePlayer from "./LottiePlayer";
import { WEATHERINFO, WEEKDAYS } from "../constants";
import { useEffect, useState } from "react";
import { useWeatherStore } from "@/store/weather";
const CurrentWeather = () => {
  let info = [];
  if (typeof window !== "undefined") {
    info = JSON.parse(localStorage.getItem("currentWeather") ?? "[]");
  }
  const [isMounted, setIsMounted] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState(info);
  // sample data from weather api
  // const weatherData = {
  //   coord: {
  //     lon: 81.2833,
  //     lat: 24.5167,
  //   },
  //   weather: [
  //     {
  //       id: 804,
  //       main: "Clouds",
  //       description: "overcast clouds",
  //       icon: "04n",
  //     },
  //   ],
  //   base: "stations",
  //   main: {
  //     temp: 31.77,
  //     feels_like: 33.08,
  //     temp_min: 31.77,
  //     temp_max: 31.77,
  //     pressure: 997,
  //     humidity: 46,
  //     sea_level: 997,
  //     grnd_level: 964,
  //   },
  //   visibility: 10000,
  //   wind: {
  //     speed: 6.15,
  //     deg: 238,
  //     gust: 12.35,
  //   },
  //   clouds: {
  //     all: 100,
  //   },
  //   dt: 1718826605,
  //   sys: {
  //     country: "IN",
  //     sunrise: 1718840806,
  //     sunset: 1718889967,
  //   },
  //   timezone: 19800,
  //   id: 1258182,
  //   name: "Rewa",
  //   cod: 200,
  // };

  const { weatherComponentVisibility } = useWeatherStore();
  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Now that we are sure it's client-side, access localStorage
      const info = JSON.parse(localStorage.getItem("currentWeather") ?? "[]");
      setWeatherInfo(info);
    }
  }, [isMounted]);

  if (!isMounted || weatherInfo.length === 0) {
    return;
  }
  const formatDateInfo = formatDate(weatherInfo?.timezone);

  return (
    <>
      <div
        className={cn(
          "mb-20 mt-20 min-h-fit select-none opacity-0 transition-all duration-700",
          {
            "opacity-100": weatherComponentVisibility,
          },
        )}
      >
        <div className="h-6/12 mx-auto w-11/12 rounded-lg bg-white/20 p-2 shadow-inner shadow-white drop-shadow-xl transition-all duration-700 sm:w-8/12 md:h-80 lg:w-6/12">
          <div className="relative">
            <div className="mb-5 flex w-full justify-between">
              <span className="ml-11">
                {formatDateInfo.hour >= 5 && formatDateInfo.hour <= 17
                  ? "Day"
                  : "Night"}
              </span>
              {/* city name & country*/}
              <div className="flex gap-1">
                <span className="text-end text-base capitalize sm:text-xl">
                  {weatherInfo?.name}, {weatherInfo?.country}
                </span>
                <MapPin className="text-zinc-500" />
              </div>
            </div>

            {/* On the basis of day and night show the day/night lottie file */}
            {formatDateInfo.hour >= 5 && formatDateInfo.hour <= 17 ? (
              <div className="absolute -left-4 -top-14 w-20 md:-left-14 md:-top-16 md:w-28">
                <LottiePlayer
                  srcPath="/morning.lottie"
                  width={100}
                  className="-rotate-[10deg]"
                />
              </div>
            ) : (
              <div className="absolute -left-10 -top-7 w-28 md:-left-16 md:-top-10 md:w-36">
                <LottiePlayer srcPath="/night.lottie" />
              </div>
            )}
          </div>

          {/* weather info */}
          <div className="flex items-center justify-between">
            <div className="overflow-hidden">
              <LottiePlayer srcPath={`/${WEATHERINFO[weatherInfo?.weather[0]?.icon].lottiefile}.lottie`} width={20} />
            </div>
            <div className="md:mr-2">
              {/* Temp in degree Celsius */}
              <h2 className="text-nowrap text-center text-2xl">
                {weatherInfo?.main.temp} <sup>o</sup>C
              </h2>

              {/* visual separator */}
              <div className="h-px w-full bg-zinc-600" />

              {/* Highest & lowest temp. */}
              <div className="flex gap-2 text-sm text-zinc-600">
                <span className="text-nowrap">
                  H: {Math.floor(weatherInfo?.main.temp_max)}
                  <sup>o</sup>
                </span>
                |
                <span className="text-nowrap">
                  L: {Math.floor(weatherInfo?.main.temp_min)}
                  <sup>o</sup>
                </span>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between px-2 text-sm">
              <div className="*-underline flex flex-col gap-2 text-zinc-700 *:underline *:decoration-zinc-500/20 *:underline-offset-4">
                <div className="flex gap-2 px-2">
                  <span>
                    Humidity &nbsp;&nbsp; {weatherInfo?.main.humidity}%
                  </span>
                </div>
                <div className="flex gap-2 px-2">
                  <span>
                    Real feel &nbsp;&nbsp; {weatherInfo?.main.feels_like}
                    <sup>o</sup>C
                  </span>
                </div>
                <div className="flex gap-2 px-2">
                  <span>
                    Pressure &nbsp;&nbsp; {weatherInfo?.main.pressure}
                    mbar
                  </span>
                </div>
              </div>

              <div className="self-start text-zinc-700">
                <div className="flex gap-2">
                  <div className="ml-auto">
                    <span className="text-sm capitalize">
                      {/* scattered clouds */}
                      {WEATHERINFO[weatherInfo?.weather[0]?.icon]?.icon}
                    </span>{" "}
                    <span className="animate-stretch">
                      {WEATHERINFO[weatherInfo?.weather[0]?.icon]?.emoji}
                    </span>
                  </div>
                </div>
                {/* visual separator */}
                <div className="h-px w-full bg-zinc-600/30" />

                <div className="flex items-center gap-1">
                  <span className="text 1">
                    chances of rain: {Number(weatherInfo?.pop * 100).toFixed(0)}
                    %
                  </span>
                  <span className="inline-block animate-stretch">☔️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default CurrentWeather;
