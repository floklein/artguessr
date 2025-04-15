"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import NumberFlow from "@number-flow/react";
import { useState } from "react";

export function SliderForm() {
  const [value, setValue] = useState<number>(1789);

  function changeValue(value: number[]) {
    setValue(value[0]);
  }

  return (
    <div className="max-w-xl w-full flex flex-col items-center gap-2 sm:gap-4 p-4 sm:p-8 border">
      <NumberFlow value={value} className="text-2xl font-bold font-serif" />
      <Slider
        min={0}
        max={2025}
        pips={[0, 500, 1000, 1500, 2025]}
        steps={50}
        value={[value]}
        onValueChange={changeValue}
      />
      <Button className="w-full max-w-xs mt-2">Submit</Button>
    </div>
  );
}
