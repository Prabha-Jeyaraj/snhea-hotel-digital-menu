import React from "react";
import type { Category } from "@/types/dish";

interface DietaryBadgeProps {
  category: Category;
  size?: "sm" | "md";
}

export const DietaryBadge: React.FC<DietaryBadgeProps> = ({
  category,
  size = "sm",
}) => {
  const boxDim = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  if (category === "veg") {
    return (
      <div
        className={`${boxDim} rounded-[2px] border border-[#00875A] bg-[#0e0e0e] flex items-center justify-center shrink-0`}
        title="Vegetarian"
        aria-label="Vegetarian"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#00875A]" />
      </div>
    );
  }

  if (category === "non-veg") {
    return (
      <div
        className={`${boxDim} rounded-[2px] border border-[#BA1A1A] bg-[#0e0e0e] flex items-center justify-center shrink-0`}
        title="Non-Vegetarian"
        aria-label="Non-Vegetarian"
      >
        <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#BA1A1A]" />
      </div>
    );
  }

  // Egg
  return (
    <div
      className={`${boxDim} rounded-[2px] border border-[#E8A817] bg-[#0e0e0e] flex items-center justify-center shrink-0`}
      title="Egg"
      aria-label="Contains Egg"
    >
      <span className="w-1.5 h-2 rounded-[50%_50%_45%_45%] bg-[#E8A817]" />
    </div>
  );
};
