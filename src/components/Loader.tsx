import { Loader2 } from "lucide-react";

const WeatherLoaderScreen = () => {
  return (
    <div className="mb-20 mt-20 min-h-fit transition-all duration-700">
      <div className="h-6/12 mx-auto w-11/12 rounded-lg bg-white/20 p-2 shadow-inner shadow-white drop-shadow-xl transition-all duration-700 md:h-80 md:w-6/12 flex justify-center items-center">
        <div className="h-20 animate-pulse">
          <div className="flex items-center gap-5">
            <span className="text-xl">Loading</span>{" "}
            <Loader2 className="animate-spin" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherLoaderScreen;
