/** Price level from $ to $$$$. */
export type Price = 1 | 2 | 3 | 4;

/** A restaurant row in the table. */
export interface RestaurantType {
  id: string;
  name: string;
  imageUrl: string;
  cuisine: string;
  suburb: string;
  rating?: number; // 1-5
  price: Price;
  visits: number;
  comments?: string;
}
