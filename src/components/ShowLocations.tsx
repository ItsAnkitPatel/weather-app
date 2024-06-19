import { useAppContext } from "@/context";
import RecentCitySearches from "./RecentCitySearches";

type City = {
  city: string;
  region: string;
  country: string;
};


const ShowLocations = () => {
  const { cities, setEnableLocationBar } = useAppContext();
  console.log("show locations", cities);
  const doSome = (city: City) => {
    console.log(city);
  };
  const storedCityNames = JSON.parse(localStorage.getItem("cityNames") ?? "[]");
  console.log(storedCityNames);
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
                doSome(city);
                setEnableLocationBar(false);
              }}
            >
              {`${city.city}, ${city.region}, ${city.country}`}
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
