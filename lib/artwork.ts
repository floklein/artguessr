import { Artwork } from "@/types";

export const MAX_POINTS = 5000;
export const MIN_DATE = 0;
export const MAX_DATE = 2025;

export function getSuccess(artwork: Artwork, value: number) {
  if ("parsedDateRange" in artwork) {
    return (
      value >= artwork.parsedDateRange[0] && value <= artwork.parsedDateRange[1]
    );
  }
  return value === artwork.parsedDate;
}

function calculatePoints(answer: number, guess: number) {
  return Math.max(
    0,
    MAX_POINTS -
      (Math.pow(Math.abs(answer - guess), 1.25) / (MAX_DATE - MIN_DATE)) *
        MAX_POINTS
  );
}

export function getPoints(artwork: Artwork, guess: number) {
  if ("parsedDateRange" in artwork) {
    if (
      guess >= artwork.parsedDateRange[0] &&
      guess <= artwork.parsedDateRange[1]
    ) {
      return MAX_POINTS;
    }
    return Math.floor(
      Math.max(
        calculatePoints(artwork.parsedDateRange[0], guess),
        calculatePoints(artwork.parsedDateRange[1], guess)
      )
    );
  }
  return Math.floor(calculatePoints(artwork.parsedDate, guess));
}
