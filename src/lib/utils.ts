import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const formatter = new Intl.NumberFormat("en", { notation: "compact" });

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function acronym(s: string) {
  return s
    .split(" ")
    .map((m) => m[0].toUpperCase())
    .join("");
}

export function formatNumber(n: number) {
  return formatter.format(n);
}

export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export const shorten = (text: string, len = 60) => {
  if (text.length < len) return text;
  return text.slice(0, len).concat("...");
};
