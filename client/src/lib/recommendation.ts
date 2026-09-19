import type {
  BudgetRange,
  Dish,
  GroupSuitability,
  MealPeriod,
  OccasionSuitability,
} from "@/types/dish";
import { getMealPeriod } from "./mealTime";

export interface RecommendationInput {
  groupType: GroupSuitability;
  occasion: OccasionSuitability;
  budget: BudgetRange | "skip";
  mealPeriod?: MealPeriod;
}

export interface DishRecommendation {
  dish: Dish;
  reason: string;
  relevanceScore: number;
  courseTag: string;
}

/**
 * Context-aware reason generation based on user input and dish metadata.
 */
function generateReason(
  dish: Dish,
  input: RecommendationInput,
  currentMeal: MealPeriod
): string {
  const occasionDesc =
    input.occasion === "celebration"
      ? "celebratory feast"
      : input.occasion === "family-gathering"
      ? "family table"
      : input.occasion === "date"
      ? "intimate pairing"
      : input.occasion === "business"
      ? "swift table service"
      : "casual meal";

  const groupDesc =
    input.groupType === "solo"
      ? "quick personal indulgence"
      : input.groupType === "couple"
      ? "thoughtfully proportioned for two"
      : input.groupType === "family"
      ? "loved by all ages at the table"
      : input.groupType === "friends" || input.groupType === "large-group"
      ? "ideal for sharing around the table"
      : "efficient single-plate combination";

  if (dish.category === "veg" && dish.spicy) {
    return `Signature spicy South Indian staple for your ${occasionDesc}.`;
  }
  if (dish.category === "non-veg") {
    return `Slow-braised coastal specialty, ${groupDesc}.`;
  }
  if (dish.sweet) {
    return `Cooling, sweet culinary finish for your ${currentMeal}.`;
  }
  if (dish.category === "egg") {
    return `Hot pan-tossed griddle favorite, ${groupDesc}.`;
  }
  return `Dakshin culinary classic, crafted for a ${occasionDesc}.`;
}

/**
 * Assigns a structured course sequencing tag if not already set.
 */
function assignCourseTag(index: number, total: number): string {
  if (index === 0) return "Course 01 • Centerpiece";
  if (index === 1) return "Course 02 • Chef Signature";
  if (index === 2) return "Course 03 • Bread Accompaniment";
  if (index === 3) return "Course 04 • Grand Finale";
  return `Course 0${index + 1} • Specialty`;
}

/**
 * Isolated rule-based recommendation engine.
 * Filters available dishes matching meal period and budget, then calculates a relevance score
 * based on group and occasion suitability overlap.
 */
export function recommend(
  dishes: Dish[],
  input: RecommendationInput
): DishRecommendation[] {
  const currentMeal = input.mealPeriod ?? getMealPeriod();

  // 1. Strict Hard Rule: available === true
  // 2. Strict Hard Rule: mealPeriod includes current meal
  const eligibleDishes = dishes.filter((dish) => {
    if (!dish.available) return false;
    if (!dish.mealPeriod.includes(currentMeal)) return false;
    return true;
  });

  // 3. Score dishes with flexible matching so near-misses on occasion don't cause 0 results
  const scoredDishes = eligibleDishes.map((dish) => {
    let score = 0;

    // Group match score
    if (dish.groupSuitability.includes(input.groupType)) {
      score += 40;
    }

    // Occasion match score
    if (dish.occasionSuitability.includes(input.occasion)) {
      score += 35;
    }

    // Budget matching (skip does not degrade result)
    if (input.budget === "skip") {
      score += 20; // equal dignity bonus for skipping budget
    } else if (dish.budgetRange === input.budget) {
      score += 30;
    } else {
      // Small penalty for budget mismatch, but not eliminated
      score += 5;
    }

    // Popular bonus
    if (dish.popular) {
      score += 15;
    }

    return {
      dish,
      score,
    };
  });

  // 4. Sort by score DESC, then popular DESC, then price
  scoredDishes.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (b.dish.popular !== a.dish.popular) {
      return b.dish.popular ? 1 : -1;
    }
    return a.dish.price - b.dish.price;
  });

  // 5. Select top 3-5 dishes
  const topPicks = scoredDishes.slice(0, 4);

  // 6. Map to DishRecommendation with custom generated reason and course tag
  return topPicks.map(({ dish, score }, index) => ({
    dish,
    reason: generateReason(dish, input, currentMeal),
    relevanceScore: score,
    courseTag: dish.courseTag || assignCourseTag(index, topPicks.length),
  }));
}
