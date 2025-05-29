"use client";

import { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

type ColorPickerProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const predefinedColors = [
  "#FF5722", // Orange
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#673AB7", // Deep Purple
  "#3F51B5", // Indigo
  "#2196F3", // Blue
  "#03A9F4", // Light Blue
  "#00BCD4", // Cyan
  "#009688", // Teal
  "#4CAF50", // Green
  "#8BC34A", // Light Green
  "#CDDC39", // Lime
  "#FFEB3B", // Yellow
  "#FFC107", // Amber
  "#FF9800", // Orange
  "#795548", // Brown
  "#607D8B", // Blue Grey
];

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState<string>(value || predefinedColors[0]);
  const [customColor, setCustomColor] = useState<string>(value || "");

  useEffect(() => {
    if (value && value !== selectedColor) {
      setSelectedColor(value);
      setCustomColor(value);
    }
  }, [value]);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    onChange(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setSelectedColor(newColor);
    onChange(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-10 h-10 rounded-md border border-input flex items-center justify-center",
            className
          )}
          style={{ backgroundColor: selectedColor }}
          aria-label="Select color"
        />
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="grid grid-cols-5 gap-2 mb-3">
          {predefinedColors.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                "w-8 h-8 rounded-md flex items-center justify-center",
                selectedColor === color ? "ring-2 ring-ring ring-offset-2" : ""
              )}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
              aria-label={`Select color ${color}`}
            >
              {selectedColor === color && (
                <CheckIcon className="h-4 w-4 text-white" />
              )}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={customColor}
            onChange={handleCustomColorChange}
            className="w-8 h-8 rounded-md p-0 border-0"
            id="custom-color"
          />
          <input
            type="text"
            value={customColor}
            onChange={handleCustomColorChange}
            className="flex-1 px-3 py-2 border rounded-md text-sm"
            placeholder="#RRGGBB"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}