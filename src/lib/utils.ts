import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FormatDateType = {
  day: string;
  hours: number;
};
export const formatDate = (milliseconds: number) => {
  const date = new Date(milliseconds * 1000);
  
  const day = date.getDay().toString();

  const hours = Number(date.getHours().toString().split("/")[0]);
  // example: 10:46:16 we are extracting 10 here

  // console.log("hours", hours);
  // console.log(
  //   "day ",
  //   day,
  //   "date",
  //   date.getDate(),
  //   date.toLocaleDateString(),
  //   "hours",
  //   date.toLocaleTimeString(),
  // );

  const data: FormatDateType = { day, hours };
  return data;
};
