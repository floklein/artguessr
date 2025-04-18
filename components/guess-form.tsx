"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  MAX_DATE,
  MAX_POINTS,
  MIN_DATE,
  getPoints,
  getSuccess,
} from "@/lib/artwork";
import { cn } from "@/lib/utils";
import { Artwork } from "@/types";
import NumberFlow from "@number-flow/react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function GuessForm({ artwork }: { artwork: Artwork }) {
  const router = useRouter();

  const [guess, setGuess] = useState<number>(1000);
  const [result, setResult] = useState<{
    success: boolean;
    points: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  function changeGuess(value: number[]) {
    setGuess(value[0]);
  }

  function incrementGuess() {
    setGuess((g) => Math.min(g + 1, MAX_DATE));
  }

  function decrementGuess() {
    setGuess((g) => Math.max(g - 1, MIN_DATE));
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResult({
      success: getSuccess(artwork, guess),
      points: getPoints(artwork, guess),
    });
  }

  function playAgain() {
    setLoading(true);
    router.refresh();
  }

  useEffect(() => {
    setGuess(1000);
    setResult(null);
    setLoading(false);
  }, [artwork.id]);

  return (
    <>
      {result && (
        <div className="max-w-xl w-full flex items-center gap-4 justify-between">
          <div>
            <p>{artwork.title}</p>
            <p className="text-muted-foreground">
              {artwork.artist_title}{" "}
              {(artwork.artist.birth_date || artwork.artist.death_date) && (
                <span className="text-xs">
                  ({artwork.artist.birth_date} - {artwork.artist.death_date})
                </span>
              )}
            </p>
          </div>
          <div className="font-serif text-2xl text-green-500">
            {artwork.date_display}
          </div>
        </div>
      )}
      <div className="max-w-xl w-full border">
        <form onSubmit={submitForm}>
          <div className="w-full flex flex-col items-center gap-2 p-4">
            <div className="flex items-center gap-2">
              <Button
                className="touch-manipulation"
                type="button"
                variant="ghost"
                size="icon"
                onClick={decrementGuess}
                disabled={guess === MIN_DATE || !!result}
              >
                <ChevronLeft />
              </Button>
              <div className="w-20 flex items-center justify-center">
                <NumberFlow
                  value={guess}
                  className={cn("text-3xl font-serif", {
                    "text-green-500": result?.success === true,
                    "text-red-500 line-through": result?.success === false,
                  })}
                />
              </div>
              <Button
                className="touch-manipulation"
                type="button"
                variant="ghost"
                size="icon"
                onClick={incrementGuess}
                disabled={guess === MAX_DATE || !!result}
              >
                <ChevronRight />
              </Button>
            </div>
            <Slider
              min={MIN_DATE}
              max={MAX_DATE}
              pips={[MIN_DATE, 500, 1000, 1500, MAX_DATE]}
              steps={50}
              value={[guess]}
              onValueChange={changeGuess}
              disabled={!!result}
            />
          </div>
          <div className="border-t p-4 flex gap-4">
            {result ? (
              <>
                <div className="text-lg flex-1 flex items-center justify-center">
                  <div>
                    <span className="font-bold">{result.points}&nbsp;</span>
                    <span className="text-sm text-muted-foreground">
                      / {MAX_POINTS} points
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={playAgain}
                  disabled={loading}
                >
                  {loading && <Loader2 className="animate-spin" />}
                  Play again
                </Button>
              </>
            ) : (
              <Button type="submit" className="flex-1">
                Make a guess
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
