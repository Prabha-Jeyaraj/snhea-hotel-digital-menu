import React, { useState } from "react";
import { assetUrl } from "@/lib/utils";
import type {
  BudgetRange,
  GroupSuitability,
  OccasionSuitability,
} from "@/types/dish";
import type { RecommendationInput } from "@/lib/recommendation";

interface RecommendationWizardProps {
  onBack: () => void;
  onFinish: (input: RecommendationInput) => void;
}

interface GroupOption {
  id: GroupSuitability;
  title: string;
  desc: string;
  icon: string;
}

interface OccasionOption {
  id: OccasionSuitability;
  title: string;
  desc: string;
  icon: string;
}

const GROUP_OPTIONS: GroupOption[] = [
  {
    id: "solo",
    title: "Just Me",
    desc: "Solo dining, quick thali or crisp roast dosa",
    icon: "person",
  },
  {
    id: "couple",
    title: "Couple",
    desc: "Two people, balanced pairings & shared desserts",
    icon: "favorite",
  },
  {
    id: "friends",
    title: "Friends",
    desc: "Group sharing, roast starters & feast platters",
    icon: "groups",
  },
  {
    id: "family",
    title: "Family",
    desc: "Kid-friendly milds, grand meals & staples",
    icon: "family_restroom",
  },
  {
    id: "work",
    title: "Work / Meeting",
    desc: "Swift express service, single-plate combos",
    icon: "business_center",
  },
  {
    id: "large-group",
    title: "Large Group",
    desc: "Full table feast with banquet-style spreads",
    icon: "diversity_3",
  },
];

const OCCASION_OPTIONS: OccasionOption[] = [
  {
    id: "casual",
    title: "Casual Meal",
    desc: "Relaxed dining, honest comfort food",
    icon: "emoji_food_beverage",
  },
  {
    id: "celebration",
    title: "Celebration",
    desc: "Special occasions, chef specials & rich gravies",
    icon: "celebration",
  },
  {
    id: "family-gathering",
    title: "Family Gathering",
    desc: "Traditional thali courses & sharing dishes",
    icon: "cottage",
  },
  {
    id: "date",
    title: "Date",
    desc: "Intimate courses, dessert pairings & filter coffee",
    icon: "local_bar",
  },
  {
    id: "business",
    title: "Business",
    desc: "Fast, dignified table service & light fare",
    icon: "work",
  },
  {
    id: "everyday",
    title: "Everyday Tiffin",
    desc: "Quick breakfast or evening tiffin favorites",
    icon: "schedule",
  },
];

export const RecommendationWizard: React.FC<RecommendationWizardProps> = ({
  onBack,
  onFinish,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedGroup, setSelectedGroup] = useState<GroupSuitability>("solo");
  const [selectedOccasion, setSelectedOccasion] =
    useState<OccasionSuitability>("casual");
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange | "skip">(
    "skip"
  );

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      onFinish({
        groupType: selectedGroup,
        occasion: selectedOccasion,
        budget: selectedBudget,
      });
    }
  };

  const handlePrev = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    } else {
      onBack();
    }
  };

  const activeGroupObj = GROUP_OPTIONS.find((g) => g.id === selectedGroup);
  const activeOccasionObj = OCCASION_OPTIONS.find(
    (o) => o.id === selectedOccasion
  );

  return (
    <div className="w-full max-w-3xl mx-auto min-h-screen bg-[#0e0e0e] text-[#e5e2e1] flex flex-col justify-between shadow-2xl relative">
      {/* Top Ambient Glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-64 bg-[#ffd400]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-5 pt-5 pb-3">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous step"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1c1b1b] text-[#e5e2e1] hover:text-[#ffd400] transition-colors border border-[#2a2a2a]"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_back
          </span>
        </button>
        <div className="flex items-center gap-2">
          <img
            src={assetUrl("/hotel-sneha-logo.jpg")}
            alt="Hotel Sneha Logo"
            className="w-7 h-7 rounded-full object-cover border border-[#ffd400]"
          />
          <span className="font-syne text-[15px] font-bold tracking-tight text-[#e5e2e1]">
            Meal Recommendation
          </span>
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1c1b1b] text-[#ffd400] border border-[#2a2a2a]">
          <span className="material-symbols-outlined text-[18px]">
            room_service
          </span>
        </div>
      </header>

      {/* Progress & Stepper */}
      <section className="relative z-10 px-5 py-2">
        <div className="bg-[#1c1b1b] border border-[#2a2a2a] rounded-lg p-3.5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#ffd400] uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ffd400]" />
              Step {step} of 3
            </span>
            <span className="text-[#999077] font-medium text-right">
              {step === 1 && "Dining Party → Occasion → Budget"}
              {step === 2 && "Dining Party ✓ → Occasion → Budget"}
              {step === 3 && "Dining Party ✓ → Occasion ✓ → Budget"}
            </span>
          </div>

          {/* 3-Segment Stepper Bars */}
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-[#ffd400]" : "bg-[#2a2a2a]"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= 2 ? "bg-[#ffd400]" : "bg-[#2a2a2a]"
              }`}
            />
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === 3 ? "bg-[#ffd400]" : "bg-[#2a2a2a]"
              }`}
            />
          </div>
        </div>
      </section>

      {/* Wizard Content Viewport */}
      <main className="relative z-10 px-5 pt-3 pb-6 flex-1 flex flex-col">
        {/* STEP 1: DINING PARTY */}
        {step === 1 && (
          <section className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd400] font-semibold">
                Table Dynamics
              </span>
              <h1 className="font-syne text-2xl font-bold text-[#fff3d6] tracking-tight leading-tight">
                Who are you dining with?
              </h1>
              <p className="text-[12px] text-[#d0c6ab] pt-0.5">
                Helps tailor portion sizes, spice profiles, and sharing platters.
              </p>
            </div>

            {/* Responsive Grid: 2 cols on mobile, 3 cols on tablet/desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {GROUP_OPTIONS.map((opt) => {
                const isSelected = selectedGroup === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedGroup(opt.id)}
                    className={`text-left p-3 rounded-lg transition-all duration-200 flex flex-col justify-between min-h-[132px] shadow-sm border ${
                      isSelected
                        ? "bg-[#1f1d18] border-[#ffd400] ring-1 ring-[#ffd400]"
                        : "bg-[#1c1b1b] border-[#2a2a2a] hover:bg-[#242323]"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          isSelected
                            ? "bg-[#ffd400]/20 text-[#ffd400]"
                            : "bg-[#2a2a2a] text-[#d0c6ab]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          {opt.icon}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isSelected ? "text-[#ffd400]" : "text-[#4d4632]"
                        }`}
                      >
                        {isSelected
                          ? "check_circle"
                          : "radio_button_unchecked"}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h3 className="font-syne text-[14px] text-[#e5e2e1] font-semibold">
                        {opt.title}
                      </h3>
                      <p className="text-[10px] text-[#999077] leading-snug mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 2: OCCASION */}
        {step === 2 && (
          <section className="flex flex-col gap-3 animate-in fade-in duration-200">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd400] font-semibold">
                Dining Atmosphere
              </span>
              <h1 className="font-syne text-2xl font-bold text-[#fff3d6] tracking-tight leading-tight">
                What brings you to the table?
              </h1>
              <p className="text-[12px] text-[#d0c6ab] pt-0.5">
                We'll highlight celebratory dishes, comforting classics, or
                swift meals.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
              {OCCASION_OPTIONS.map((opt) => {
                const isSelected = selectedOccasion === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOccasion(opt.id)}
                    className={`text-left p-3 rounded-lg transition-all duration-200 flex flex-col justify-between min-h-[132px] shadow-sm border ${
                      isSelected
                        ? "bg-[#1f1d18] border-[#ffd400] ring-1 ring-[#ffd400]"
                        : "bg-[#1c1b1b] border-[#2a2a2a] hover:bg-[#242323]"
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <div
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          isSelected
                            ? "bg-[#ffd400]/20 text-[#ffd400]"
                            : "bg-[#2a2a2a] text-[#d0c6ab]"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[19px]">
                          {opt.icon}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isSelected ? "text-[#ffd400]" : "text-[#4d4632]"
                        }`}
                      >
                        {isSelected
                          ? "check_circle"
                          : "radio_button_unchecked"}
                      </span>
                    </div>

                    <div className="mt-2">
                      <h3 className="font-syne text-[14px] text-[#e5e2e1] font-semibold">
                        {opt.title}
                      </h3>
                      <p className="text-[10px] text-[#999077] leading-snug mt-0.5">
                        {opt.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 3: BUDGET WITH DIGNIFIED SKIP */}
        {step === 3 && (
          <section className="flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest text-[#ffd400] font-semibold">
                Preference (Optional)
              </span>
              <h1 className="font-syne text-2xl font-bold text-[#fff3d6] tracking-tight leading-tight">
                Budget comfort per person
              </h1>
              <p className="text-[12px] text-[#d0c6ab] pt-0.5">
                Aligns recommendations with your preferred price range. Skipping
                preserves full gourmet selection.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setSelectedBudget("low")}
                className={`py-3.5 px-3 rounded-lg border text-center transition-all ${
                  selectedBudget === "low"
                    ? "bg-[#1f1d18] border-[#ffd400] text-[#ffd400] ring-1 ring-[#ffd400]"
                    : "bg-[#1c1b1b] border-[#2a2a2a] text-[#e5e2e1] hover:bg-[#242323]"
                }`}
              >
                <div className="font-syne text-[15px] font-bold">
                  ₹150 – ₹300
                </div>
                <div className="text-[10px] text-[#999077] mt-0.5">
                  Comfort Tiffin
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBudget("medium")}
                className={`py-3.5 px-3 rounded-lg border text-center transition-all ${
                  selectedBudget === "medium"
                    ? "bg-[#1f1d18] border-[#ffd400] text-[#ffd400] ring-1 ring-[#ffd400]"
                    : "bg-[#1c1b1b] border-[#2a2a2a] text-[#e5e2e1] hover:bg-[#242323]"
                }`}
              >
                <div className="font-syne text-[15px] font-bold">
                  ₹300 – ₹600
                </div>
                <div className="text-[10px] text-[#999077] mt-0.5">
                  Full Meal Platter
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedBudget("high")}
                className={`py-3.5 px-3 rounded-lg border text-center transition-all ${
                  selectedBudget === "high"
                    ? "bg-[#1f1d18] border-[#ffd400] text-[#ffd400] ring-1 ring-[#ffd400]"
                    : "bg-[#1c1b1b] border-[#2a2a2a] text-[#e5e2e1] hover:bg-[#242323]"
                }`}
              >
                <div className="font-syne text-[15px] font-bold">₹600+</div>
                <div className="text-[10px] text-[#999077] mt-0.5">
                  Royal Feast
                </div>
              </button>

              {/* Dignified Equal Skip Option */}
              <button
                type="button"
                onClick={() => setSelectedBudget("skip")}
                className={`py-3.5 px-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center ${
                  selectedBudget === "skip"
                    ? "bg-[#1f1d18] border-[#ffd400] text-[#ffd400] ring-1 ring-[#ffd400]"
                    : "bg-[#252422] border-[#333] text-[#e5e2e1] hover:bg-[#2a2825]"
                }`}
              >
                <div className="flex items-center gap-1 font-syne text-[15px] font-bold">
                  <span className="material-symbols-outlined text-[16px]">
                    all_inclusive
                  </span>
                  <span>Skip</span>
                </div>
                <div className="text-[10px] text-[#999077] mt-0.5">
                  No Budget Limit
                </div>
              </button>
            </div>
          </section>
        )}
      </main>

      {/* Floating Bottom Bar */}
      <footer className="sticky bottom-0 z-20 w-full p-4 bg-[#141414]/95 border-t border-[#2a2a2a] backdrop-blur-md flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] text-[#999077] px-1">
          <span>
            Current:{" "}
            <strong className="text-[#ffd400]">
              {step === 1 && activeGroupObj?.title}
              {step === 2 && activeOccasionObj?.title}
              {step === 3 &&
                (selectedBudget === "skip"
                  ? "No Budget Filter"
                  : `Budget: ${selectedBudget.toUpperCase()}`)}
            </strong>
          </span>
          <span>Dine-in Menu</span>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className="w-full h-12 bg-[#ffd400] hover:bg-[#ebc300] text-[#0d0d0d] font-syne font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-[0.98]"
        >
          <span>
            {step === 1 && "Next: Choose Occasion"}
            {step === 2 && "Next: Budget Preference"}
            {step === 3 && "View Table Recommendations"}
          </span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
      </footer>
    </div>
  );
};
