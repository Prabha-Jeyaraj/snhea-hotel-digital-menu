import React, { useMemo, useState } from "react";
import { assetUrl } from "@/lib/utils";
import type { Dish } from "@/types/dish";
import { MENU_DISHES, MENU_SECTIONS } from "@/data/menuData";
import { OpeningFolio } from "@/components/OpeningFolio";
import { DishCard } from "@/components/DishCard";
import { DishDetailSheet } from "@/components/DishDetailSheet";
import { RecommendationWizard } from "@/components/RecommendationWizard";
import { TableRecommendations } from "@/components/TableRecommendations";
import {
  recommend,
  type DishRecommendation,
  type RecommendationInput,
} from "@/lib/recommendation";

type DietaryTab = "All" | "Veg" | "Non-Veg" | "Egg";

const DIETARY_TABS: DietaryTab[] = ["All", "Veg", "Non-Veg", "Egg"];

export default function Home() {
  const [showOpening, setShowOpening] = useState(true);
  const [activeTab, setActiveTab] = useState<DietaryTab>("All");
  const [selectedSection, setSelectedSection] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [viewState, setViewState] = useState<"menu" | "wizard" | "results">(
    "menu"
  );
  const [recommendations, setRecommendations] = useState<DishRecommendation[]>(
    []
  );

  // Filter dishes strictly ensuring available === true
  const filteredDishes = useMemo(() => {
    return MENU_DISHES.filter((dish) => {
      // Hard Rule: Never recommend or display a dish marked unavailable
      if (!dish.available) return false;

      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesSection = dish.menuSection.toLowerCase().includes(q);
        if (!matchesName && !matchesSection) return false;
      }

      // Dietary filter match
      if (activeTab === "Veg" && dish.category !== "veg") return false;
      if (activeTab === "Non-Veg" && dish.category !== "non-veg") return false;
      if (activeTab === "Egg" && dish.category !== "egg") return false;

      // Menu Section match
      if (selectedSection !== "All" && dish.menuSection !== selectedSection) {
        return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, selectedSection]);

  // Group filtered dishes by section
  const dishesBySection = useMemo(() => {
    const map = new Map<string, Dish[]>();
    for (const dish of filteredDishes) {
      const list = map.get(dish.menuSection) || [];
      list.push(dish);
      map.set(dish.menuSection, list);
    }
    return map;
  }, [filteredDishes]);

  const handleFinishWizard = (input: RecommendationInput) => {
    const results = recommend(MENU_DISHES, input);
    setRecommendations(results);
    setViewState("results");
  };

  // If opening folio should display (checked against sessionStorage internally)
  if (showOpening) {
    return <OpeningFolio onComplete={() => setShowOpening(false)} />;
  }

  // Wizard Screen (Screen 4)
  if (viewState === "wizard") {
    return (
      <RecommendationWizard
        onBack={() => setViewState("menu")}
        onFinish={handleFinishWizard}
      />
    );
  }

  // Recommendations Screen (Screen 5)
  if (viewState === "results") {
    return (
      <>
        <TableRecommendations
          recommendations={recommendations}
          onSelectDish={(dish) => setSelectedDish(dish)}
          onBackToMenu={() => setViewState("menu")}
        />
        {selectedDish && (
          <DishDetailSheet
            dish={selectedDish}
            onClose={() => setSelectedDish(null)}
          />
        )}
      </>
    );
  }

  // Master Menu Screen (Fluid Responsive Layout)
  return (
    <div className="w-full min-h-screen bg-[#0e0e0e] text-[#e5e2e1] flex flex-col justify-between relative pb-24 sm:pb-16">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-[#ffd400]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. Top Compact Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[#2a2a2a]/80 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden shrink-0 border border-[#ffd400]/60 bg-[#0d0d0d]">
              <img
                src={assetUrl("/hotel-sneha-logo.jpg")}
                alt="Hotel Sneha Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="font-syne text-[15px] sm:text-[17px] font-bold text-[#e5e2e1] uppercase tracking-tight leading-none">
                HOTEL SNEHA
              </div>
              <div className="text-[10px] text-[#ffd400] font-semibold uppercase tracking-[0.2em] mt-0.5">
                SOUTH INDIAN
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              type="button"
              aria-label="Search dishes"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`w-9 h-9 rounded-lg flex items-center justify-center border border-[#2a2a2a] transition-colors ${
                isSearchOpen
                  ? "bg-[#ffd400] text-[#0d0d0d]"
                  : "bg-[#1c1b1b] text-[#d0c6ab] hover:text-[#ffd400]"
              }`}
            >
              <span className="material-symbols-outlined text-[19px]">
                {isSearchOpen ? "close" : "search"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Expandable Search Input */}
      {isSearchOpen && (
        <div className="bg-[#141414] border-b border-[#2a2a2a] py-3 px-4 sm:px-6 lg:px-8 z-30">
          <div className="max-w-7xl mx-auto">
            <div className="relative flex items-center bg-[#1c1b1b] border border-[#ffd400]/60 rounded-xl px-3.5 py-2.5 max-w-xl">
              <span className="material-symbols-outlined text-[#ffd400] text-[20px] mr-2.5">
                search
              </span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes by name, ingredients, flavours..."
                className="w-full bg-transparent text-[14px] text-[#e5e2e1] placeholder-[#999077] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-[#999077] hover:text-[#e5e2e1]"
                  aria-label="Clear search"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 2. Compact Branded Header / Hero Section (Under half viewport height) */}
      <section className="relative z-10 border-b border-[#2a2a2a]/60 bg-gradient-to-b from-[#141414] to-[#0e0e0e] py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Brand Wordmark & Short Line */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#ffd400] shadow-xl bg-[#0d0d0d] mb-3">
              <img
                src={assetUrl("/hotel-sneha-logo.jpg")}
                alt="Hotel Sneha Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="font-syne text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#fff3d6]">
              HOTEL SNEHA
            </h1>
            <p className="font-syne text-[11px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#ffd400] mt-0.5">
              SOUTH INDIAN
            </p>
            <p className="text-[13px] text-[#d0c6ab] mt-2 font-normal">
              Authentic South Indian flavours, crafted with tradition.
            </p>
          </div>

          {/* Compact Recommendation Discover Card */}
          <div className="w-full md:max-w-md bg-[#1c1b1b] border border-[#2a2a2a] rounded-xl p-4 sm:p-5 shadow-lg relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-[#ffd400]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">✨</span>
                  <h2 className="font-syne text-[15px] sm:text-[16px] text-[#fff3d6] font-bold tracking-tight">
                    Not sure what to choose?
                  </h2>
                </div>
                <p className="text-[12px] text-[#d0c6ab] mt-1">
                  Let us recommend a personalized course sequence.
                </p>
              </div>

              {/* Loop Arrow */}
              <div className="shrink-0 text-[#ffd400] pt-1">
                <svg
                  className="w-6 h-8 transform rotate-12"
                  fill="none"
                  viewBox="0 0 36 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4C14 4 28 8 26 20C24 30 11 26 14 36C15 40 18 42 20 44"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M14 38L21 44L26 38"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setViewState("wizard")}
              className="mt-3.5 w-full py-2.5 px-4 bg-[#ffd400] hover:bg-[#ebc300] text-[#0d0d0d] rounded-lg font-syne text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <span>Discover your perfect meal</span>
              <span className="material-symbols-outlined text-[17px]">
                east
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Category & Section Filter Chips */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-5 pb-2 flex flex-col gap-3">
        {/* Dietary Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {DIETARY_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-all duration-200 text-xs font-semibold select-none border shrink-0 ${
                  isActive
                    ? "bg-[#ffd400] text-[#0d0d0d] border-[#ffd400] shadow-sm font-bold"
                    : "bg-[#1c1b1b] text-[#d0c6ab] border-[#2a2a2a] hover:bg-[#252424]"
                }`}
              >
                {tab === "Veg" && (
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00875A]" />
                )}
                {tab === "Non-Veg" && (
                  <span className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[6px] border-b-[#BA1A1A]" />
                )}
                {tab === "Egg" && (
                  <span className="material-symbols-outlined text-[14px]">
                    egg
                  </span>
                )}
                <span>{tab}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Section Horizontal Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedSection("All")}
            className={`px-3 py-1 rounded-full text-[11px] transition-all shrink-0 border ${
              selectedSection === "All"
                ? "bg-[#2e2d27] text-[#ffd400] border-[#ffd400]/60 font-bold shadow-sm"
                : "bg-[#141414] text-[#999077] border-[#262626] hover:text-[#e5e2e1]"
            }`}
          >
            All Sections
          </button>
          {MENU_SECTIONS.map((section) => {
            const isSecActive = selectedSection === section;
            return (
              <button
                key={section}
                type="button"
                onClick={() => setSelectedSection(section)}
                className={`px-3 py-1 rounded-full text-[11px] transition-all shrink-0 border ${
                  isSecActive
                    ? "bg-[#2e2d27] text-[#ffd400] border-[#ffd400]/60 font-bold shadow-sm"
                    : "bg-[#141414] text-[#999077] border-[#262626] hover:text-[#e5e2e1]"
                }`}
              >
                {section}
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. Fluid Responsive Dish Grid (Grouped by Menu Section) */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[#2a2a2a]/60 pb-2">
          <span className="text-xs uppercase tracking-wider text-[#999077] font-semibold">
            {searchQuery ? "Search Results" : "Our Menu"}
          </span>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-center gap-2 bg-[#1c1b1b] rounded-2xl border border-[#2a2a2a] p-8">
            <span className="material-symbols-outlined text-4xl text-[#ffd400]">
              search_off
            </span>
            <h3 className="font-syne text-lg font-bold text-[#e5e2e1]">
              No dishes found
            </h3>
            <p className="text-xs text-[#999077] max-w-sm">
              Try adjusting your search query or selecting a different filter.
            </p>
          </div>
        ) : searchQuery ? (
          /* When searching, show direct multi-column responsive grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onSelect={(selected) => setSelectedDish(selected)}
              />
            ))}
          </div>
        ) : (
          /* When browsing, organize by Section */
          <div className="flex flex-col gap-8">
            {Array.from(dishesBySection.entries()).map(([section, dishes]) => (
              <section key={section} className="flex flex-col gap-3.5">
                <div className="flex items-center gap-2.5 pt-2 pb-1 border-b border-[#2a2a2a]/60">
                  <span className="w-1.5 h-4 rounded-full bg-[#ffd400]" />
                  <h2 className="font-syne text-base sm:text-lg font-bold text-[#ffd400] uppercase tracking-wider">
                    {section}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                  {dishes.map((dish) => (
                    <DishCard
                      key={dish.id}
                      dish={dish}
                      onSelect={(selected) => setSelectedDish(selected)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Fresh Preparation Note */}
        <div className="mt-6 p-4 rounded-xl bg-[#1c1b1b] border border-[#2a2a2a] flex items-center gap-3.5 shadow-sm max-w-2xl">
          <span className="material-symbols-outlined text-[#ffd400] text-[22px] shrink-0">
            outdoor_grill
          </span>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-syne text-[#e5e2e1] font-bold uppercase tracking-wider">
              Prepared Fresh To Order
            </span>
            <span className="text-xs text-[#d0c6ab] leading-tight mt-0.5">
              Every dish is crafted fresh with authentic South Indian spices and pure ingredients.
            </span>
          </div>
        </div>
      </main>

      {/* Floating Bottom Quick Action Nav for Mobile */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#141414]/95 border-t border-[#2a2a2a] backdrop-blur-md px-10 py-2.5 flex items-center justify-around shadow-2xl">
        <button
          type="button"
          onClick={() => {
            setActiveTab("All");
            setSearchQuery("");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-0.5 text-[#ffd400]"
        >
          <span className="material-symbols-outlined text-[20px]">
            restaurant_menu
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase">
            Menu
          </span>
        </button>

        <button
          type="button"
          onClick={() => setViewState("wizard")}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffd400] text-[#0d0d0d] font-syne font-bold text-xs shadow-md"
        >
          <span className="material-symbols-outlined text-[16px]">
            auto_awesome
          </span>
          <span>Discover</span>
        </button>
      </nav>

      {/* Dish Detail Sheet Modal */}
      {selectedDish && (
        <DishDetailSheet
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </div>
  );
}
