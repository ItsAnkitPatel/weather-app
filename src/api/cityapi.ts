import { debounce } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

interface CityData {
  country: string;
  city: string;
  region: string;
  latitude?: number;
  longitude?: number;
}

const fetchLocations = debounce(
  async (
    cityName: string,
    setEnableLocation: Dispatch<SetStateAction<boolean>>,
    setCities: Dispatch<SetStateAction<CityData[]>>,
    setSearchLoader: Dispatch<SetStateAction<boolean>>,
  ) => {
    setSearchLoader(true);
    const url = `${process.env.NEXT_PUBLIC_ANALYTICS_GEODB_API}&namePrefix=${cityName}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": `${process.env.NEXT_PUBLIC_ANALYTICS_GEODB_API_KEY}`,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };
    try {
      console.log(cityName);
      const response = await fetch(url, options);
      const result = await response.json();
      let citiesData;
      if (result) {
        citiesData = result.data.map((cityData: CityData) => ({
          country: cityData.country,
          city: cityData.city,
          region: cityData.region,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        }));
      } else {
        citiesData = [];
      }
      if (cityName.trim() !== "" && citiesData.length > 0) {
        storeCityInLocalStorage(cityName);
      } else {
        if (cityName.trim() !== "") {
          toast.error("Not Found", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }

      console.log("cities data", citiesData);
      setCities(citiesData);
      setSearchLoader(false);
      setEnableLocation(true);
    } catch (error) {
      console.error(error);
    }
  },
  1200,
  {
    trailing: true,
  },
);

const storeCityInLocalStorage = (cityName: string) => {
  let storedCityNames: string[] = JSON.parse(
    localStorage.getItem("cityNames") || "[]",
  );

  storedCityNames.push(cityName);

  if (storedCityNames.length > 3) {
    // unshift can also be used here
    storedCityNames.splice(0, 1);
  }
  localStorage.setItem("cityNames", JSON.stringify(storedCityNames));
};
export default fetchLocations;
