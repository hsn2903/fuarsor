export type actionFunction = (
  prevState: unknown,
  formData: FormData
) => Promise<{ message: string }>;

export type PropertyCardProps = {
  image: string;
  id: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export interface FairFilters {
  name?: string;
  category?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}

// types/fair.ts
export type ProgramDetail = {
  date: string;
  activity: string;
};

export type TourProgram = {
  title1: string;
  title2: string;
  title3: string;
  description: string;
  singlePersonPrice: number;
  twoPersonPrice: number;
  programs: ProgramDetail[];
};

export type Fair = {
  fairName: string;
  name: string;
  tourPrograms: TourProgram[]; // This will be stringified when storing
};
