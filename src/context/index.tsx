import React, {
  useContext,
  createContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type City = {
  name: string;
  region: string;
  country: string;
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

  enableOverlay: boolean;
  setEnableOverlay: Dispatch<SetStateAction<boolean>>;

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
  enableOverlay: false,
  setEnableOverlay: () => {},
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
 
  const [enableOverlay, setEnableOverlay] = useState(false);
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

        enableOverlay,
        setEnableOverlay,

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
