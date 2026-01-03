// Simple type for dropdown options
export type SelectOption = {
  id: string;
  name: string;
};

// Type for our local Package state
export type ActivityState = {
  dayNumber: number;
  description: string;
};

export type PackageState = {
  // We use a temporary ID (e.g. timestamp) to track items in the UI list before they are saved to DB
  tempId: number;
  name: string;
  duration: string;
  description: string;
  priceSingle: number;
  priceDouble: number;
  activities: ActivityState[];
};
