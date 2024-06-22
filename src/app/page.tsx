"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBar from "@/components/SearchBar";
import LottiePlayer from "@/components/LottiePlayer";
import { AppContextProvider } from "@/context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CurrentWeather from "@/components/CurrentWeather";
import { useWeatherStore } from "@/store/weather";
import WeatherLoaderScreen from "@/components/Loader";
import ForecastWeather from "@/components/ForecastWeather";

export default function Home() {
  const { enableCurrentWeather, weatherLoaderScreen } = useWeatherStore();
  return (
    <AppContextProvider>
      <MaxWidthWrapper>
        <ToastContainer stacked />
        <div className="flex items-center max-sm:mb-2">
          <div className="w-56">
            <LottiePlayer srcPath="/sun-animation.lottie" />
          </div>
          <h1 className="text-3xl lg:text-nowrap">Weather Wonders</h1>
        </div>
        <SearchBar />

        {enableCurrentWeather ? (
          <CurrentWeather />
        ) : (
          weatherLoaderScreen && <WeatherLoaderScreen />
        )}

        {enableCurrentWeather && <ForecastWeather />}
      </MaxWidthWrapper>
    </AppContextProvider>
  );
}
