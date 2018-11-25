import { OrderDish } from './OrderDish';

export interface Order {
    dishes: OrderDish[];
    price: number;
    date: string;
    uid: string;
    name: string;
    direction: string;
    pending: boolean;
}
