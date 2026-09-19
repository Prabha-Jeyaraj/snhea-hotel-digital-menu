export type Category = "veg" | "non-veg" | "egg";

export type MealPeriod = "breakfast" | "lunch" | "dinner";

export type GroupSuitability =
  | "solo"
  | "couple"
  | "friends"
  | "family"
  | "work"
  | "large-group";

export type OccasionSuitability =
  | "casual"
  | "celebration"
  | "family-gathering"
  | "date"
  | "business"
  | "everyday";

export type BudgetRange = "low" | "medium" | "high";

export interface InferredFieldsInfo {
  spicy: boolean;
  sweet: boolean;
  mealPeriod: boolean;
  groupSuitability: boolean;
  occasionSuitability: boolean;
  budgetRange: boolean;
  popular: boolean;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // e.g. "/placeholder-dish.svg"
  category: Category;
  menuSection: string;
  spicy: boolean;
  sweet: boolean;
  mealPeriod: MealPeriod[];
  groupSuitability: GroupSuitability[];
  occasionSuitability: OccasionSuitability[];
  budgetRange: BudgetRange;
  popular: boolean;
  available: boolean;
  serverCode?: string;
  courseTag?: string;
  /**
   * Clearly flags fields that were inferred so they can be reviewed and corrected later.
   */
  _inferred?: InferredFieldsInfo;
}
