import { useAppContext } from "@/context";
import RecentCitySearches from "./RecentCitySearches";
import fetchWeather from "@/api/weatherapi";
import { useWeatherStore } from "@/store/weather";

export type CityData = {
  name: string;
  region: string;
  country: string;
  longitude?: number;
  latitude?: number;
};

const ShowLocations = () => {
  const { cities, setEnableLocationBar, setEnableOverlay } = useAppContext();

  const {
    setEnableCurrentWeather,
    setWeatherLoaderScreen,
    setWeatherComponentVisibility,
  } = useWeatherStore();

  const currentWeatherComponentFunc = () => {
    setEnableCurrentWeather(true);
    setWeatherLoaderScreen(false);
  };

  const callWeatherAPI = async (city: CityData) => {
    setEnableCurrentWeather(false);
    setWeatherLoaderScreen(true);
    setWeatherComponentVisibility(true);

    await fetchWeather(city);

    setTimeout(() => {
      // Taking 3 seconds intentional delay so that information can get loaded in localstrorage
      currentWeatherComponentFunc();
    }, 3000);
  };


  return (
    <>
      {/* visual separator */}
      <div className="h-px w-full bg-zinc-700/20" />

      <div className="mt-2 space-y-4 px-2 pb-2">
        {cities ? (
          cities.map((city, index) => (
            <div
              className="w-full rounded-lg px-2 py-3 transition-shadow duration-300 hover:cursor-pointer hover:border hover:shadow-lg"
              key={index}
              onClick={() => {
                callWeatherAPI(city);
                setEnableLocationBar(false);
                setEnableOverlay(false);
              }}
            >
              {`${city.name}, ${city.region}, ${city.country}`}
            </div>
          ))
        ) : (
          <div className="h-px w-full"></div>
        )}
        {cities.length === 0 && <RecentCitySearches />}
      </div>
    </>
  );
};

export default ShowLocations;
