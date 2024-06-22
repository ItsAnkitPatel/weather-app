import { Loader2 } from "lucide-react";

const WeatherLoaderScreen = () => {
  return (
    <div className="mb-20 mt-20 min-h-fit transition-all duration-700">
      <div className="h-6/12 h-6/12 mx-auto flex w-11/12 items-center justify-center rounded-lg bg-white/20 p-2 shadow-inner shadow-white drop-shadow-xl transition-all duration-700 sm:w-8/12 md:h-80 md:w-6/12 lg:w-6/12">
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
