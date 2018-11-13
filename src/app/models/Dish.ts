import { SideDish } from './SideDish';
export interface Dish {
  thumbnail?: string;
  name: string;
  type: string;
  price: number;
  id?: string;
  sideDishes?: string[];
}
