export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export type SeatingArea = 'indoor' | 'terrace' | 'window' | 'lounge';

export interface Reservation {
  id: string;
  userId: string | null; // null if guest reservation
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  occasion: string;
  seatingArea: SeatingArea;
  notes?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled' | 'attended';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'bakery' | 'brunch' | 'dessert';
  tags: ('vegan' | 'gluten-free' | 'contains-nuts' | 'signature' | 'organic')[];
  image: string;
  popular: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
