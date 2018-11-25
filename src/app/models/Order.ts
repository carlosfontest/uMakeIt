import { OrderDish } from "./OrderDish";

export interface Order {
    dishes: OrderDish[],
    price: number,
    date: string,
    uid: string
}
