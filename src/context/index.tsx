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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
