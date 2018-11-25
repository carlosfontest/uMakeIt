export interface Dish {
  thumbnail?: string;
  thumbnailReal?: string;
  name: string;
  type: string;
  price: number;
  id?: string;
  sideDishes?: string[];
}
