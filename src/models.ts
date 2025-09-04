export interface Recipe {
  id: number;
  title: string;
  making_time: string;
  serves: string;
  ingredients: string;
  cost: string;
  created_at?: Date;
  updated_at?: Date;
}