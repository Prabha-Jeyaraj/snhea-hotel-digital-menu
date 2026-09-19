import React from "react";
import { assetUrl } from "@/lib/utils";
import type { Dish } from "@/types/dish";
import type { DishRecommendation } from "@/lib/recommendation";
import { DietaryBadge } from "./DietaryBadge";
import { getMealPeriodLabel, getMealPeriod } from "@/lib/mealTime";

interface TableRecommendationsProps {
  recommendations: DishRecommendation[];
  onSelectDish: (dish: Dish) => void;
  onBackToMenu: () => void;
}

export const TableRecommendations: React.FC<TableRecommendationsProps> = ({
  recommendations,
  onSelectDish,
  onBackToMenu,
}) => {
  const currentMeal = getMealPeriod();
  const mealLabel = getMealPeriodLabel(currentMeal);

  // Total value calculation
  const totalValue = recommendations.reduce(
    (sum, item) => sum + item.dish.price,
    0
  );

  return (
    <div className="w-full max-w-5xl mx-auto min-h-screen bg-[#0e0e0e] text-[#e5e2e1] flex flex-col justify-between shadow-2xl relative px-4 sm:px-6 lg:px-8 pb-12">
      {/* Top Ambient Glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#ffd400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between py-6 border-b border-[#2a2a2a]/60">
        <button
          type="button"
          onClick={onBackToMenu}
          aria-label="Back to full menu"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1c1b1b] text-[#e5e2e1] hover:text-[#ffd400] transition-colors border border-[#2a2a2a]"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_back
          </span>
        </button>
        <div className="flex items-center gap-2.5">
          <img
            src={assetUrl("/hotel-sneha-logo.jpg")}
            alt="Hotel Sneha Logo"
            className="w-8 h-8 rounded-full object-cover border border-[#ffd400]"
          />
          <span className="font-syne text-[16px] sm:text-[18px] font-bold tracking-tight text-[#e5e2e1]">
            Curated Recommendations
          </span>
        </div>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-6 flex-1 flex flex-col">
        {/* Intro */}
        <div className="flex flex-col gap-1.5 max-w-2xl">
          <div className="flex items-center gap-1.5 text-[#ffd400] text-[11px] font-semibold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[15px]">
              auto_awesome
            </span>
            <span>Curated for {mealLabel}</span>
          </div>
          <h1 className="font-syne text-2xl sm:text-3xl font-bold text-[#fff3d6] leading-tight">
            Recommended For You
          </h1>
          <p className="text-[13px] text-[#d0c6ab] leading-relaxed">
            Handpicked based on your preferences — tap any dish to see more.
          </p>
        </div>

        {/* Section Heading & Swipe Cue (Mobile only) */}
        <div className="mt-8 flex items-center justify-between text-[11px] text-[#999077]">
          <span className="font-syne font-semibold uppercase tracking-wider text-[#e5e2e1] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-[#ffd400]">
              restaurant_menu
            </span>
            <span>RECOMMENDED DISHES</span>
          </span>
          <span className="sm:hidden flex items-center gap-1 text-[#ffd400]">
            <span>Swipe left</span>
            <span className="material-symbols-outlined text-[14px]">
              arrow_forward
            </span>
          </span>
        </div>

        {/* Responsive Cards Layout: Swipeable on mobile (<768px), 2-col on tablet, 4-col on desktop */}
        <div className="mt-3.5 flex gap-4 overflow-x-auto snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible pb-4 no-scrollbar">
          {recommendations.map(({ dish, reason, courseTag }) => (
            <article
              key={dish.id}
              className="flex-none w-[280px] sm:w-auto snap-center flex flex-col bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-lg hover:border-[#ffd400]/40 transition-all group"
            >
              {/* Dish Visual Header */}
              <div className="relative w-full h-44 bg-[#141414] overflow-hidden">
                <img
                  src={dish.imageUrl || "/placeholder-dish.svg"}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      "/placeholder-dish.svg";
                  }}
                />
                {/* Veg/Non-Veg Badge Top-Right */}
                <div className="absolute top-2.5 right-2.5 bg-[#0d0d0d]/90 backdrop-blur-sm p-1 rounded">
                  <DietaryBadge category={dish.category} />
                </div>

                {/* Course Order Pill */}
                <div className="absolute bottom-2.5 left-2.5 bg-[#0d0d0d]/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-syne font-bold uppercase tracking-wider text-[#ffd400] border border-[#2a2a2a]">
                  {courseTag}
                </div>
              </div>

              {/* Card Details */}
              <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <div className="flex items-start justify-between gap-1.5">
                    <h2 className="font-syne text-[15px] font-bold text-[#e5e2e1] leading-tight group-hover:text-[#ffd400] transition-colors">
                      {dish.name}
                    </h2>
                    <span className="font-syne text-[15px] text-[#ffd400] italic font-bold shrink-0">
                      ₹{dish.price}
                    </span>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="inline-flex items-center gap-1.5 mt-2 bg-[#252420] border border-[#3b3620] px-2 py-1 rounded text-[11px] text-[#ffd400]">
                    <span className="material-symbols-outlined text-[13px] text-[#ffd400] shrink-0">
                      stars
                    </span>
                    <p className="leading-tight text-[11px]">{reason}</p>
                  </div>
                </div>

                {/* View Details Action */}
                <button
                  type="button"
                  onClick={() => onSelectDish(dish)}
                  className="w-full py-2.5 bg-[#252424] hover:bg-[#2e2d2d] text-[#e5e2e1] hover:text-[#ffd400] border border-[#333] hover:border-[#ffd400]/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors text-[12px] font-semibold tracking-wide"
                >
                  <span>View Details</span>
                  <span className="material-symbols-outlined text-[15px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Full Set Value Summary Pill */}
        <div className="mt-4 p-4 bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl flex items-center justify-between shadow-sm max-w-xl">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-[#999077]">
              Curated Selection
            </span>
            <span className="font-syne text-[15px] text-[#e5e2e1] font-bold">
              Chef's Curated Pairing
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-[#999077]">
              Combined Value
            </span>
            <span className="font-syne text-[18px] text-[#ffd400] italic font-bold">
              ₹{totalValue}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl">
          <button
            type="button"
            onClick={onBackToMenu}
            className="flex-1 h-12 bg-[#ffd400] hover:bg-[#ebc300] text-[#0d0d0d] font-syne font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">
              menu_book
            </span>
            <span>View Full Menu</span>
          </button>
        </div>
      </main>
    </div>
  );
};
