import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatDateType = {
  day: number;
  date: number;
  hour: number;
};
export const formatDate = ( timeZone: number) => {

    // Convert timezone offset from seconds to milliseconds
  const offsetMilliseconds = timeZone * 1000;

  // Get the local time in milliseconds
  const localTimeMilliseconds = new Date().toUTCString() + offsetMilliseconds;
  

  // Create a new Date object with the local time
  const localDate = new Date(localTimeMilliseconds);
  
  // Get the hour in local time
  const day = localDate.getDay();
  const hour = localDate.getHours();
  const date = localDate.getDate();
console.log(localDate.toLocaleDateString())
  console.log(date);
  // Determine if it's day or night
  console.log("day", day, "hour", hour, "date", date);
  const data: FormatDateType = { day, date, hour };
  return data;
};
