// types/index.ts
export interface TradeShow {
  id: string; // generated unique id
  name: string;
  description: string;
  link: string;
  cycle: string;
  venue: string;
  date: string;
  duration?: string;
}
