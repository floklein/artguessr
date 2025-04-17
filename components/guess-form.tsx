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
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export function GuessForm({ artwork }: { artwork: Artwork }) {
  const router = useRouter();

  const [guess, setGuess] = useState<number>(1000);
  const [result, setResult] = useState<{
    success: boolean;
    points: number;
  } | null>(null);

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
    setGuess(1000);
    setResult(null);
    router.refresh();
  }

  return (
    <div className="max-w-xl w-full border">
      {result && (
        <div className="border-b p-4 flex items-center gap-4 justify-between">
          <div>
            <p>{artwork.title}</p>
            <p className="text-muted-foreground">
              {artwork.artists.map((artist) => (
                <HoverCard key={artist.id}>
                  <HoverCardTrigger asChild>
                    <span className="cursor-help border-b border-dashed border-muted-foreground">
                      {artist.name}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex space-x-4">
                      <Image
                        src={artist._links.thumbnail.href}
                        alt={artist.name}
                        width={100}
                        height={100}
                      />
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{artist.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {artist.nationality}, {artist.birthday} –{" "}
                          {artist.deathday}
                        </p>
                        <a
                          href={artist._links.permalink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="link" className="p-0">
                            Learn more
                          </Button>
                        </a>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </p>
          </div>
          <div className="font-serif whitespace-nowrap text-2xl text-green-500">
            {artwork.date}
          </div>
        </div>
      )}
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
              <div className="text-white text-lg flex-1 flex items-center justify-center">
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
              >
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
  );
}
