export type Book = {
  bookId: string;
  name: string;
  author: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string; // gradient + emoji combo
  description: string;
  quantity:number;
  
};

export const CATEGORIES = ["All", "Fiction", "Fantasy", "Nonfiction", "Thriller", "Romance", "Biography", "Science"];


export type CartItem = Book & { quantity: number };
