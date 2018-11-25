import { SideDish } from './SideDish';
import { Dish } from 'src/app/models/Dish';

export interface OrderDish {
    dish: Dish;
    sideDishes?: SideDish[];
    quantity: number;
}
