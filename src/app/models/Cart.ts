import { Dish } from './Dish';

export interface Cart {
  dishes: {dish: Dish, quantity: number}[];
  price: number;
}
