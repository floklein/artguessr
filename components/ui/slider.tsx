"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  pips = [],
  steps,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & {
  pips?: number[];
  steps?: number;
}) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
        ? defaultValue
        : [min, max],
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        pips.length > 0 && "pb-8",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-muted relative grow overflow-hidden data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2"
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="border-primary bg-background ring-ring/50 block w-3 h-5 shrink-0 border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
        />
      ))}
      <div className="absolute top-4 left-0 w-full px-1.5">
        <div className="relative top-0 left-0 w-full h-full -z-1">
          {pips.map((pip) => (
            <div
              key={pip}
              className="absolute top-0 left-(--pip-left) -translate-x-1/2 text-xs"
              style={
                {
                  "--pip-left": `${(pip / (max - min)) * 100}%`,
                } as React.CSSProperties
              }
            >
              <div className="w-px h-3 bg-muted-foreground mx-auto" />
              {pip}
            </div>
          ))}
          {steps &&
            Array.from(
              { length: Math.floor((max - min) / steps) + 1 },
              (_, index) => (
                <div
                  key={index}
                  className="absolute top-0 left-(--pip-left) -translate-x-1/2"
                  style={
                    {
                      "--pip-left": `${((index * steps) / (max - min)) * 100}%`,
                    } as React.CSSProperties
                  }
                >
                  <div className="w-px h-1 bg-muted-foreground" />
                </div>
              )
            )}
        </div>
      </div>
    </SliderPrimitive.Root>
  );
}

export { Slider };
