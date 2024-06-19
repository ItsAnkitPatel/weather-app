import fetchLocations from "@/api/cityapi";
import { useAppContext } from "@/context";
import { CircleX } from "lucide-react";
import {  useState } from "react";

const RecentCitySearches = () => {
  const [storedCityNames, setStoredCityNames] = useState(
    JSON.parse(localStorage.getItem("cityNames") ?? "[]"),
  );

  const { setCities, setEnableLocationBar, setSearchLoader, setInputValue } =
    useAppContext();

  console.log(storedCityNames);

  const updateInput = async (city: string) => {
    setInputValue(city);

    await fetchLocations(
      city,
      setEnableLocationBar,
      setCities,
      setSearchLoader,
    );
  };

  // If this function is called that means values exists in the localStorage
  const deleteStoredCityName = (city: string) => {
    const afterCityDeleteArray = storedCityNames.filter(
      (cityNames: string) => cityNames !== city,
    );
    setStoredCityNames(afterCityDeleteArray);
    localStorage.setItem("cityNames", JSON.stringify(afterCityDeleteArray));
  };

  return (
    <div className="flex gap-5">
      {storedCityNames.map((city: string) => (
        <div
          className="flex items-center rounded-full bg-zinc-200 px-1 py-2 hover:bg-zinc-300 transition-all duration-300 hover:shadow-md"
          key={city}
        >
          <span
            className="cursor-pointer px-2 pr-5 text-black"
            onClick={() => updateInput(city)}
          >
            {city}
          </span>
          <CircleX
            className="cursor-pointer text-zinc-600 hover:text-zinc-500"
            onClick={() => deleteStoredCityName(city)}
          />
        </div>
      ))}
    </div>
  );
};

export default RecentCitySearches;
