import React from "react";
import type { Dish } from "@/types/dish";
import { DietaryBadge } from "./DietaryBadge";

interface DishCardProps {
  dish: Dish;
  onSelect: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onSelect }) => {
  return (
    <article
      onClick={() => onSelect(dish)}
      className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-4 shadow-sm flex gap-4 hover:bg-[#222121] hover:border-[#ffd400]/40 transition-all cursor-pointer group select-none h-full"
    >
      {/* Square Image Placeholder (Left-Aligned within card) */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg shrink-0 overflow-hidden bg-[#141414] border border-[#262626] relative self-start">
        <img
          src={dish.imageUrl || "/placeholder-dish.svg"}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/placeholder-dish.svg";
          }}
        />
      </div>

      {/* Content Block in Exact Order */}
      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          {/* 1. Small Status Row: dietary dot + label & Available tag */}
          <div className="flex items-center gap-2 text-[11px] mb-1">
            <div className="flex items-center gap-1.5">
              <DietaryBadge category={dish.category} size="sm" />
              <span className="font-semibold text-[#d0c6ab] uppercase text-[10px] tracking-wider">
                {dish.category === "non-veg" ? "Non-Veg" : dish.category === "veg" ? "Veg" : "Egg"}
              </span>
            </div>
            <span className="text-[#4d4632]">•</span>
            <span className="inline-flex items-center gap-1 text-[#00875a] font-medium text-[10px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00875a]" />
              Available
            </span>
          </div>

          {/* 2. Dish Name in Bold Display Font */}
          <h3 className="font-syne text-[16px] sm:text-[17px] text-[#e5e2e1] font-bold leading-snug group-hover:text-[#ffd400] transition-colors line-clamp-1">
            {dish.name}
          </h3>

          {/* 3. Short Description Line (2-line clamp, muted color) */}
          <p className="text-[12px] text-[#999077] line-clamp-2 leading-relaxed mt-1">
            {dish.description}
          </p>
        </div>

        {/* 4. Bottom Row: Price (yellow/gold, prominent) + View Details aligned on same row */}
        <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#262626]/70">
          <span className="font-syne text-[18px] text-[#ffd400] font-bold italic">
            ₹{dish.price}
          </span>
          <button
            type="button"
            className="text-[12px] font-semibold text-[#d0c6ab] group-hover:text-[#ffd400] flex items-center gap-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dish);
            }}
          >
            <span>View details</span>
            <span className="material-symbols-outlined text-[15px] transform group-hover:translate-x-0.5 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};
