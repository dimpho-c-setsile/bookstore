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
/*
export const BOOKS: Book[] = [

  { id: "9", title: "The Hitchhiker's Guide to the Galaxy", author: "Douglas Adams", price: 113.99, category: "Fiction", cover: "/images/galaxy.jpg", rating: 4.8, reviews: 7832, year: 1979, pages: 224, description: "The story of Arthur Dent, who survives the demolition of Earth to discover the answer to life, the universe, and everything.", tags: ["comedy", "sci-fi", "classic"] },
  { id: "10", title: "Dune", author: "Frank Herbert", price: 119.99, category: "Fantasy", cover: "/images/dune.jpg", rating: 4.9, reviews: 10231, badge: "Iconic", year: 1965, pages: 896, description: "Set on the desert planet Arrakis, this is the story of the boy Paul Atreides — who would become the mysterious man known as Muad'Dib.", tags: ["epic", "desert", "prophecy"] },
  { id: "11", title: "The Silent Patient", author: "Alex Michaelides", price: 115.99, category: "Thriller", cover: "/images/patient.jpg", rating: 4.5, reviews: 5643, badge: "New", year: 2019, pages: 325, description: "A famous painter shoots her husband — then never speaks another word. Her therapist is obsessed with uncovering her motive.", tags: ["mystery", "psychology", "twist"] },
  { id: "12", title: "A Brief History of Time", author: "Stephen Hawking", price: 220.99, category: "Science", cover: "/images/history.jpg", rating: 4.6, reviews: 6102, badge: "Classic", year: 1988, pages: 212, description: "From the Big Bang to black holes — a landmark volume in science writing.", tags: ["physics", "cosmos", "theory"] },
];*/

export type CartItem = Book & { quantity: number };
