import { create } from "zustand";


interface weatherState {
  enableCurrentWeather: boolean;
  setEnableCurrentWeather: (enableCurrentWeather: boolean) => void;
  weatherLoaderScreen: boolean;
  setWeatherLoaderScreen: (searchStarted: boolean) => void;
  weatherComponentVisibility: boolean;
  setWeatherComponentVisibility: (viabilityOfWeatherComponent: boolean) => void;
}

export const useWeatherStore = create<weatherState>()((set) => ({
  enableCurrentWeather: true,
  setEnableCurrentWeather: (enableCurrentWeather: boolean) =>
    set({ enableCurrentWeather }),
  weatherLoaderScreen: false,
  setWeatherLoaderScreen: (searchStarted: boolean) =>
    set({ weatherLoaderScreen: searchStarted }),

  weatherComponentVisibility: true,
  setWeatherComponentVisibility: (viabilityOfWeatherComponent: boolean) =>
    set({ weatherComponentVisibility: viabilityOfWeatherComponent }),
  
}));
