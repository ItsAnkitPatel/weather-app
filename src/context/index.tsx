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

  // Provide the state and the updater function to the context
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  // Use the context
  return useContext(AppContext);
};
