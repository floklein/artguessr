import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findMap<T, R>(
  array: T[],
  callback: (item: T) => R | undefined
): R | undefined {
  for (const item of array) {
    const result = callback(item);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}
