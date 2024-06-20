import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type City = {
  city: string;
  region: string;
  country: string;
};

type WeatherType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: string;
      description: string;
      icon: string;
    },
  ];

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  dt: number;
  sys: {
    country: string;
  };
  name: string;
  cod: number;
};

const initialWeatherValues:WeatherType= {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [
    {
      main: "",
      description: "",
      icon: "",
    },
  ],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  dt: 0,
  sys: {
    country: "",
  },
  name: "",
  cod: 0,
};


type AppContextType = {
  cities: City[];
  setCities: Dispatch<SetStateAction<City[]>>;
  enableLocationBar: boolean;
  setEnableLocationBar: Dispatch<SetStateAction<boolean>>;
  searchLoader: boolean;
  setSearchLoader: Dispatch<SetStateAction<boolean>>;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  enableCurrentWeather: boolean;
  setEnableCurrentWeather: Dispatch<SetStateAction<boolean>>;
  enableOverlay: boolean;
  setEnableOverlay: Dispatch<SetStateAction<boolean>>;

  // For weather
  currentWeatherValues: WeatherType;
  setCurrentWeatherValues: Dispatch<SetStateAction<WeatherType>>;
  forecastWeatherValues: Object;
  setForecastWeatherValues: Dispatch<SetStateAction<Object>>;
};

// Create a context with a default value
const AppContext = createContext<AppContextType>({
  cities: [],
  setCities: () => {},
  enableLocationBar: false,
  setEnableLocationBar: () => {},
  searchLoader: false,
  setSearchLoader: () => {},
  inputValue: "",
  setInputValue: () => {},
  enableCurrentWeather: false,
  setEnableCurrentWeather: () => {},
  enableOverlay: false,
  setEnableOverlay: () => {},
  currentWeatherValues: initialWeatherValues,
  setCurrentWeatherValues: () => {},
  forecastWeatherValues: {},
  setForecastWeatherValues: () => {},
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cities, setCities] = useState<City[]>([]);
  const [enableLocationBar, setEnableLocationBar] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [enableCurrentWeather, setEnableCurrentWeather] = useState(false);
  const [enableOverlay, setEnableOverlay] = useState(false);
  const [currentWeatherValues, setCurrentWeatherValues] =
    useState<WeatherType>(initialWeatherValues);
  const [forecastWeatherValues, setForecastWeatherValues] = useState({});

  

  return (
    <AppContext.Provider
      value={{
        cities,
        setCities,
        enableLocationBar,
        setEnableLocationBar,
        searchLoader,
        setSearchLoader,
        inputValue,
        setInputValue,
        enableCurrentWeather,
        setEnableCurrentWeather,
        enableOverlay,
        setEnableOverlay,

        currentWeatherValues,
        setCurrentWeatherValues,
        forecastWeatherValues,
        setForecastWeatherValues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
