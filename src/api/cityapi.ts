import { CityData } from "@/components/ShowLocations";
import { debounce } from "lodash";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const fetchLocations = debounce(
  async (
    cityName: string,
    setEnableLocationBar: Dispatch<SetStateAction<boolean>>,
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
      console.log("result api data", result);
      let citiesData;
      if (result) {
        citiesData = result.data.map((cityData: CityData) => ({
          country: cityData.country,
          name: cityData.name,
          region: cityData.region,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        }));
      } else {
        citiesData = [];
      }

      if (cityName.trim() !== "" && citiesData.length > 0) {
        storeCityInLocalStorage(cityName);
        setCities(citiesData);
      } else {
        if (cityName.trim() !== "") {
          toast.error("City Not Found", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      }

      console.log("cities data", citiesData);
      setSearchLoader(false);
      setEnableLocationBar(true);
    } catch (error: any) {
      setEnableLocationBar(true);

      if (error.message === "Failed to fetch") {
        toast.error("Failed to Fetch. Please check your internet🌐", {
          autoClose: 3000,
        });
      }
      console.log(error.message);
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
  // if the recent search already exists in the localStorage, then no need to go further
  if (storedCityNames.includes(cityName)) {
    return;
  }
  storedCityNames.push(cityName);

  if (storedCityNames.length > 3) {
    // unshift can also be used here
    storedCityNames.splice(0, 1);
  }
  localStorage.setItem("cityNames", JSON.stringify(storedCityNames));
};
export default fetchLocations;
