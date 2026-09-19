import type { MealPeriod } from "@/types/dish";

/**
 * Pure function that determines the meal period based on local time.
 * - Before 12:00 -> "breakfast"
 * - 12:00 – 18:00 -> "lunch"
 * - After 18:00 -> "dinner"
 */
export function getMealPeriod(date: Date = new Date()): MealPeriod {
  const hour = date.getHours();
  if (hour < 12) {
    return "breakfast";
  }
  if (hour < 18) {
    return "lunch";
  }
  return "dinner";
}

/**
 * Natural phrasing helper for UI copy.
 */
export function getMealPeriodLabel(period: MealPeriod): string {
  switch (period) {
    case "breakfast":
      return "Breakfast";
    case "lunch":
      return "Lunch";
    case "dinner":
      return "Dinner";
  }
}

/**
 * Generates natural recommendation headline copy incorporating the current time-aware context.
 */
export function getMealGreeting(period: MealPeriod): string {
  switch (period) {
    case "breakfast":
      return "Morning Classics & Tiffin";
    case "lunch":
      return "Afternoon Thali & Specialties";
    case "dinner":
      return "Evening Feasts & Grills";
  }
}
