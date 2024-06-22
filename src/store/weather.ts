import { create } from "zustand";

export type selectedCityType = {
  name: string;
  country: string;
};
interface weatherState {
  enableCurrentWeather: boolean;
  setEnableCurrentWeather: (enableCurrentWeather: boolean) => void;
  weatherLoaderScreen: boolean;
  setWeatherLoaderScreen: (searchStarted: boolean) => void;
  weatherComponentVisibility: boolean;
  setWeatherComponentVisibility: (viabilityOfWeatherComponent: boolean) => void;
  selectedCity: selectedCityType;
  setSelectedCity: (city: selectedCityType) => void;
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
  
  selectedCity: { name: "", country: "" },
  setSelectedCity: (city: selectedCityType) => set({ selectedCity: city }),
}));
