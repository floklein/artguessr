"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Artwork } from "@/zod";
import NumberFlow from "@number-flow/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SliderForm({ artwork }: { artwork: Artwork }) {
  const router = useRouter();

  const [value, setValue] = useState<number>(1000);
  const [result, setResult] = useState<{
    success: boolean;
    points: number;
  } | null>(null);

  function changeValue(value: number[]) {
    setValue(value[0]);
  }

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (result) {
      setValue(1000);
      setResult(null);
      router.refresh();
      return;
    }
    const matches = artwork.date.match(/\d+/);
    if (!matches?.[0]) return;
    const date = parseInt(matches[0]);
    setResult({
      success: value === date,
      points: Math.floor(5000 - (Math.abs(value - date) / 2025) * 5000),
    });
  }

  return (
    <div className="max-w-xl w-full border">
      {result && (
        <div className="border-b p-4 flex items-center gap-4 justify-between">
          <span className="text-muted-foreground">{artwork.title}</span>
          <span className="font-serif whitespace-nowrap text-2xl text-green-500">
            {artwork.date}
          </span>
        </div>
      )}
      <form onSubmit={submitForm}>
        <div className="w-full flex flex-col items-center gap-2 p-4">
          <NumberFlow
            value={value}
            className={cn("text-2xl font-bold font-serif", {
              "text-green-500": result?.success === true,
              "text-red-500 line-through": result?.success === false,
            })}
          />
          <Slider
            min={0}
            max={2025}
            pips={[0, 500, 1000, 1500, 2025]}
            steps={50}
            value={[value]}
            onValueChange={changeValue}
            disabled={!!result}
          />
        </div>
        <div className="border-t p-4 flex gap-4">
          {result && (
            <div className="text-white text-lg flex-1 flex items-center justify-center">
              <div>
                <span className="font-bold">{result.points}&nbsp;</span>
                <span className="text-sm text-muted-foreground">
                  / 5000 points
                </span>
              </div>
            </div>
          )}
          <Button
            type="submit"
            variant={result ? "secondary" : "default"}
            className="flex-1"
          >
            {result ? "Play again" : "Make a guess"}
          </Button>
        </div>
      </form>
    </div>
  );
}
