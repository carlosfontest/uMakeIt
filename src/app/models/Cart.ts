import { Dish } from "./Dish";

export interface Cart {
    dishes: {dish: Dish, quantity: string}[],
    price: string
  }
  