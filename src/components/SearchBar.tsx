"use client";

import fetchLocations from "@/api/cityapi";
import { useAppContext } from "@/context";
import { LucideSearch } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import SearchLoader from "./SearchLoader";
import ShowLocations from "./ShowLocations";
import { cn } from "@/lib/utils";

const SearchBar = () => {
  // extracting context values
  const {
    setCities,
    enableLocationBar,
    setEnableLocationBar,
    setSearchLoader,
    searchLoader,
    inputValue,
    setInputValue,
    enableOverlay,
    setEnableOverlay,
  } = useAppContext();

  // It is used for removing the ShowLocations component
  const searchBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setEnableLocationBar(false);
        setEnableOverlay(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setEnableLocationBar, setEnableOverlay]);

  // API fetch call function
  const startSearch = async (cityName: string) => {
    await fetchLocations(
      cityName,
      setEnableLocationBar,
      setCities,
      setSearchLoader,
    );
  };

  const handleSearchBtnClick = async (e: FormEvent) => {
    e.preventDefault();

    setCities([]);
    if (inputValue.trim() !== "") {
      setSearchLoader(true);
      startSearch(inputValue);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;

    setInputValue(newInputValue);
    setCities([]);

    if (newInputValue.trim() !== "") {
      console.log("executed");
      setSearchLoader(true);
      startSearch(newInputValue);
    }
  };

  return (
    <>
      {/* overlay */}
      {enableOverlay && (
        <div className="absolute inset-0 left-0 right-0 -z-10 min-h-screen w-screen bg-black/50" />
      )}

      <div
        ref={searchBarRef}
        className={cn(
          "relative mx-auto w-full overflow-hidden rounded-xl bg-white/70 p-1 shadow-md duration-200 focus-within:shadow-lg hover:shadow-lg lg:max-w-4xl",
          { "bg-white": enableOverlay },
        )}
      >
        <div className="z-10 w-full">
          <form onSubmit={handleSearchBtnClick}>
            <div className="flex items-center justify-between px-1">
              <div className="w-full">
                <input
                  name="city"
                  value={inputValue}
                  type="text"
                  className="h-10 w-full bg-transparent px-2 outline-none"
                  onChange={handleChange}
                  onClick={() => {
                    setEnableLocationBar(true);
                    setEnableOverlay(true);
                  }}
                  autoComplete="off"
                  placeholder="Enter your city ☃️"
                />
              </div>
              <div className="flex">
                {searchLoader && <SearchLoader />}
                <LucideSearch
                  className="mx-4 cursor-pointer"
                  onClick={handleSearchBtnClick}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Location section */}
        {enableLocationBar && <ShowLocations />}
      </div>
    </>
  );
};

export default SearchBar;
