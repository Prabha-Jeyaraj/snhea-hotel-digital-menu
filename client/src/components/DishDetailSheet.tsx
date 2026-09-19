import React from "react";
import type { Dish } from "@/types/dish";
import { DietaryBadge } from "./DietaryBadge";

interface DishDetailSheetProps {
  dish: Dish;
  onClose: () => void;
}

export const DishDetailSheet: React.FC<DishDetailSheetProps> = ({
  dish,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-[480px] bg-[#1c1b1b] border border-[#2a2a2a] rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in slide-in-from-bottom duration-250">
        {/* Top Handle for mobile */}
        <div className="sm:hidden w-12 h-1 bg-[#353534] rounded-full mx-auto mt-2.5 mb-1" />

        {/* Large Visual Section */}
        <div className="relative w-full h-56 sm:h-64 bg-[#141414] overflow-hidden">
          <img
            src={dish.imageUrl || "/placeholder-dish.svg"}
            alt={dish.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/placeholder-dish.svg";
            }}
          />
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#0d0d0d]/80 border border-[#2a2a2a] text-[#e5e2e1] hover:text-[#ffd400] flex items-center justify-center transition-colors shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>

          {/* Badge */}
          <div className="absolute bottom-3 left-3 bg-[#0d0d0d]/90 backdrop-blur-md px-2.5 py-1 rounded border border-[#2a2a2a] flex items-center gap-1.5 text-[11px] text-[#ffd400] font-semibold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">
              restaurant
            </span>
            <span>Authentic Recipe</span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 flex flex-col gap-3 overflow-y-auto">
          {/* Eyebrow & Badges */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DietaryBadge category={dish.category} size="md" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#999077]">
                {dish.category === "non-veg" ? "NON-VEG" : dish.category === "veg" ? "VEG" : "EGG"} • SOUTH INDIAN
              </span>
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="font-syne text-2xl font-bold text-[#e5e2e1] leading-tight">
              {dish.name}
            </h2>
            <div className="font-syne text-xl font-bold text-[#ffd400] mt-1 italic">
              ₹{dish.price}
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#d0c6ab] leading-relaxed">
            {dish.description}
          </p>

          {/* Prepared to Order & Availability Status */}
          <div className="py-2.5 px-3 rounded bg-[#201f1f] border border-[#2a2a2a] flex items-center justify-between text-[11px] text-[#999077]">
            <span className="flex items-center gap-1.5 text-[#00875a] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#00875a] animate-pulse" />
              Available for dining
            </span>
            <span className="flex items-center gap-1 text-[#d0c6ab]">
              <span className="material-symbols-outlined text-[14px]">
                outdoor_grill
              </span>
              Prepared fresh to order
            </span>
          </div>

          {/* Action CTA */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full h-12 bg-[#ffd400] hover:bg-[#ebc300] text-[#0d0d0d] font-syne font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
            >
              <span>Back to Menu</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
