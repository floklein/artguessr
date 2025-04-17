import { Artwork } from "@/types";

export const MAX_POINTS = 5000;
export const MIN_DATE = 0;
export const MAX_DATE = 2025;

export function getSuccess(artwork: Artwork, value: number) {
  return value >= artwork.date_start && value <= artwork.date_end;
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
  if (guess >= artwork.date_start && guess <= artwork.date_end) {
    return MAX_POINTS;
  }
  return Math.floor(
    Math.max(
      calculatePoints(artwork.date_start, guess),
      calculatePoints(artwork.date_end, guess)
    )
  );
}
