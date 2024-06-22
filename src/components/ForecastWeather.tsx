import { WEATHERINFO, WEEKDAYS } from "@/constants";
import { cn } from "@/lib/utils";
import { useWeatherStore } from "@/store/weather";
import { useEffect, useState } from "react";
const ForecastWeather = () => {
  const [initialTransition, setInitialTransition] = useState(true);

  let info = [];
  if (typeof window !== "undefined") {
    info = JSON.parse(localStorage.getItem("forecastWeather") ?? "[]");
  }

  const [forecastInfo, setForecastInfo] = useState(info);
  const [isMounted, setIsMounted] = useState(false);
  const { weatherComponentVisibility } = useWeatherStore();

  useEffect(() => {
    setIsMounted(true); // Component has mounted
  }, []);

  useEffect(() => {
    if (isMounted) {
      const data = JSON.parse(localStorage.getItem("forecastWeather") ?? "[]");

      setForecastInfo(data);
    }
  }, [isMounted]);

  const sampleData = {
    main: {
      temp: 19.67,
      feels_like: 19.55,
      temp_min: 19.67,
      temp_max: 21.39,
      pressure: 1011,
      humidity: 71,
    },
    weather: [
      {
        main: "Clouds",
        description: "scattered clouds",
        icon: "03d",
      },
    ],

    pop: 0.05,
  };

  const dayInWeek = new Date().getDay();
  const forecastDays = WEEKDAYS.slice(dayInWeek, WEEKDAYS.length).concat(
    WEEKDAYS.slice(0, dayInWeek),
  );
  if (!isMounted || forecastInfo.length === 0) {
    return;
  }

  return (
    <div
      className={cn("mb-32 opacity-0 transition-all duration-700", {
        "opacity-100": weatherComponentVisibility,
      })}
    >
      <div className="mx-auto w-7/12">
        <div className="flex flex-col px-2 py-3 md:flex md:flex-row md:justify-around md:gap-1">
          {Array.from({ length: 5 }, (_, i) => {
            const index = i === 0 ? 0 : i * 8;
            console.log("index", index);
            return (
              // Before Hover
              <div className="rounded-3xl shadow-lg" key={i}>
                <div
                  
                  className={`group relative min-h-48 w-20 overflow-hidden text-wrap rounded-3xl p-2 shadow-inner shadow-zinc-400/80 transition-all duration-1000 max-md:hover:h-52 md:hover:w-52`}
                >
                  <div className="absolute flex flex-col items-center gap-8 py-2 text-zinc-700 transition-opacity duration-1000 group-hover:opacity-0">
                    <span className="text-lg">{forecastDays[i]}</span>
                    <span className="animate-stretch text-2xl">
                      {
                        WEATHERINFO[
                          forecastInfo?.list[index]?.weather[0]["icon"]
                        ]?.emoji
                      }
                    </span>
                    <span>
                      {forecastInfo?.list[index]?.main.feels_like} <sup>o</sup>C
                    </span>
                  </div>
                  
                  
                  {/* After hover */}
                  <div className="absolute mx-auto flex flex-col gap-3 px-1 py-2 text-zinc-800 opacity-0 transition-all duration-1000 *:underline *:decoration-zinc-500/20 *:underline-offset-4 group-hover:opacity-100">
                    <div className="space-x-4">
                      <span className="capitalize">
                        {
                          WEATHERINFO[
                            forecastInfo?.list[index]?.weather[0]["icon"]
                          ]?.icon
                        }
                      </span>
                      <span className="animate-stretch inline-block text-xl">
                        {
                          WEATHERINFO[
                            forecastInfo?.list[index]?.weather[0]["icon"]
                          ]?.emoji
                        }
                      </span>
                    </div>
                    <div className="flex space-x-6">
                      <span>Min Temp </span>{" "}
                      <span>
                        {forecastInfo?.list[index].main.temp_max} <sup>o</sup>C
                      </span>
                    </div>
                    <div className="flex space-x-6">
                      <span>Max Temp </span>
                      <span>
                        {forecastInfo?.list[index].main.temp_min} <sup>o</sup>C
                      </span>
                    </div>
                    <div className="flex space-x-6">
                      <span>Pressure</span>
                      <span>{forecastInfo?.list[index].main.pressure}mbar</span>
                    </div>
                    <div className="flex space-x-6">
                      <span>chances of rain</span>
                      <span>{forecastInfo?.list[index].main.humidity}%</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ForecastWeather;
