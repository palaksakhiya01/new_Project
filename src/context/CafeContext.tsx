import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Reservation, MenuItem, ContactMessage, Review, SeatingArea } from '../types';

export type ActivePage = 'home' | 'menu' | 'reservation' | 'about' | 'contact' | 'login';

interface AlertMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

interface CafeContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  currentUser: User | null;
  register: (name: string, email: string, phone: string) => boolean;
  login: (email: string) => boolean;
  logout: () => void;
  reservations: Reservation[];
  addReservation: (reservationData: Omit<Reservation, 'id' | 'userId' | 'createdAt' | 'status'>) => void;
  cancelReservation: (id: string) => void;
  menuItems: MenuItem[];
  contactMessages: ContactMessage[];
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
  reviews: Review[];
  addReview: (name: string, rating: number, comment: string) => void;
  alert: AlertMessage | null;
  showAlert: (type: 'success' | 'error' | 'info', text: string) => void;
  clearAlert: () => void;
}

const CafeContext = createContext<CafeContextType | undefined>(undefined);

// Initial preset of reviews
const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Eleanor Vance',
    rating: 5,
    comment: 'The single-origin pour-over here is outstanding. The baristas really know their craft. Cozy, warm vibe and wonderful sourdough pastries!',
    date: 'July 5, 2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r2',
    name: 'Marcus Brody',
    rating: 5,
    comment: 'An absolute gem. Their terrace is the perfect spot for weekend brunch. The avocado toast is perfectly balanced, and the matcha latte is velvety.',
    date: 'June 28, 2026',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 'r3',
    name: 'Clara Oswald',
    rating: 4,
    comment: 'Excellent reservation system, our window table was ready exactly when we arrived. Fantastic coffee, though the bakery items sell out quickly!',
    date: 'June 15, 2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150'
  }
];

// Initial preset of menu items
const INITIAL_MENU: MenuItem[] = [
  // COFFEE
  {
    id: 'm1',
    name: 'Artisan Pour Over',
    description: 'Single-origin Ethiopian Yirgacheffe, notes of jasmine, bergamot, and sweet blueberry. Hand-brewed with care.',
    price: 6.50,
    category: 'coffee',
    tags: ['organic', 'signature'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm2',
    name: 'House Cappuccino',
    description: 'Double espresso shots of our signature house blend with silky, micro-foamed organic milk and a dust of cocoa.',
    price: 4.75,
    category: 'coffee',
    tags: ['organic'],
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 'm3',
    name: 'Velvet Flat White',
    description: 'Rich ristretto shots blended with steamed milk at a perfect velvety texture for an intense, creamy espresso profile.',
    price: 5.00,
    category: 'coffee',
    tags: [],
    image: 'https://images.unsplash.com/photo-1510707577719-ee7c14b5133c?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm4',
    name: 'Cold Brew Elixir',
    description: '18-hour slow-dripped cold brew served over block ice with hints of dark chocolate and low acidity.',
    price: 5.50,
    category: 'coffee',
    tags: ['vegan'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=400',
    popular: false
  },

  // TEA
  {
    id: 'm5',
    name: 'Ceremonial Matcha Latte',
    description: 'Stone-ground Uji matcha whisked with water and steamed oat milk, lightly sweetened with maple syrup.',
    price: 6.00,
    category: 'tea',
    tags: ['vegan', 'organic', 'signature'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm6',
    name: 'Hibiscus Blossom Tea',
    description: 'Refreshing steep of organic Egyptian hibiscus, sweet orange peel, and rose hips. Served hot or iced.',
    price: 4.50,
    category: 'tea',
    tags: ['vegan', 'gluten-free', 'organic'],
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 'm7',
    name: 'Masala Chai Latte',
    description: 'House-made blend of black tea, fresh cardamom, ginger, cloves, and cinnamon, simmered with soy milk.',
    price: 5.50,
    category: 'tea',
    tags: ['vegan', 'organic'],
    image: 'https://images.unsplash.com/photo-1578885136359-16c5bd46ee7c?auto=format&fit=crop&q=80&w=400',
    popular: false
  },

  // BAKERY
  {
    id: 'm8',
    name: 'Butter Croissant',
    description: 'Flaky, multi-layered French pastry, laminated with premium Normandy butter. Baked fresh every morning.',
    price: 4.25,
    category: 'bakery',
    tags: [],
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm9',
    name: 'Artisan Sourdough Loaf',
    description: 'A slice of our signature 36-hour slow-fermentation wild sourdough bread, served with salted butter or fruit jam.',
    price: 3.50,
    category: 'bakery',
    tags: ['vegan'],
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 'm10',
    name: 'Almond Pistachio Croissant',
    description: 'Double-baked buttery croissant filled with rich frangipane cream and loaded with sliced almonds and pistachios.',
    price: 5.50,
    category: 'bakery',
    tags: ['contains-nuts'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    popular: true
  },

  // BRUNCH
  {
    id: 'm11',
    name: 'Heirloom Avocado Toast',
    description: 'Toasted wild sourdough, smashed Hass avocado, heirloom cherry tomatoes, organic microgreens, and pumpkin seeds.',
    price: 14.50,
    category: 'brunch',
    tags: ['vegan', 'signature'],
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm12',
    name: 'Sourdough French Toast',
    description: 'Thick-cut sourdough soaked in spiced custard, griddled golden, topped with seasonal fresh berries and pure maple syrup.',
    price: 15.00,
    category: 'brunch',
    tags: [],
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400',
    popular: false
  },
  {
    id: 'm13',
    name: 'Smoked Salmon Benedict',
    description: 'Toasted brioche, cold-smoked Atlantic salmon, poached farm eggs, capers, dill, and velvety lemon hollandaise sauce.',
    price: 17.50,
    category: 'brunch',
    tags: ['signature'],
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=400',
    popular: true
  },

  // DESSERT
  {
    id: 'm14',
    name: 'Warm Lava Fondant',
    description: 'Decadent 70% dark Belgian chocolate cake with a molten liquid core, served with organic Madagascar vanilla bean ice cream.',
    price: 9.50,
    category: 'dessert',
    tags: ['contains-nuts'],
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400',
    popular: true
  },
  {
    id: 'm15',
    name: 'Gluten-Free Lemon Tart',
    description: 'Zesty lemon curd filled in a crisp, gluten-free almond flour shell, topped with burnt meringue swirls.',
    price: 8.50,
    category: 'dessert',
    tags: ['gluten-free', 'contains-nuts'],
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=400',
    popular: false
  }
];

export const CafeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [alert, setAlert] = useState<AlertMessage | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem('cafe_users');
      const storedUser = localStorage.getItem('cafe_current_user');
      const storedReservations = localStorage.getItem('cafe_reservations');
      const storedMessages = localStorage.getItem('cafe_messages');
      const storedReviews = localStorage.getItem('cafe_reviews');

      if (storedUsers) setUsers(JSON.parse(storedUsers));
      if (storedUser) setCurrentUser(JSON.parse(storedUser));
      if (storedReservations) setReservations(JSON.parse(storedReservations));
      if (storedMessages) setContactMessages(JSON.parse(storedMessages));
      if (storedReviews) setReviews(JSON.parse(storedReviews));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    }
  }, []);

  // Save to LocalStorage
  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('cafe_users', JSON.stringify(newUsers));
  };

  const saveCurrentUser = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('cafe_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cafe_current_user');
    }
  };

  const saveReservations = (newReservations: Reservation[]) => {
    setReservations(newReservations);
    localStorage.setItem('cafe_reservations', JSON.stringify(newReservations));
  };

  const saveMessages = (newMessages: ContactMessage[]) => {
    setContactMessages(newMessages);
    localStorage.setItem('cafe_messages', JSON.stringify(newMessages));
  };

  const saveReviews = (newReviews: Review[]) => {
    setReviews(newReviews);
    localStorage.setItem('cafe_reviews', JSON.stringify(newReviews));
  };

  // Helper to show custom dynamic alerts
  const showAlert = (type: 'success' | 'error' | 'info', text: string) => {
    setAlert({ type, text });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  // Auth Operations
  const register = (name: string, email: string, phone: string): boolean => {
    const emailLower = email.toLowerCase().trim();
    if (users.some(u => u.email === emailLower)) {
      showAlert('error', 'An account with this email already exists.');
      return false;
    }

    const newUser: User = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: emailLower,
      phone: phone.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    saveCurrentUser(newUser);
    showAlert('success', `Welcome, ${newUser.name}! Your account has been registered.`);
    return true;
  };

  const login = (email: string): boolean => {
    const emailLower = email.toLowerCase().trim();
    const user = users.find(u => u.email === emailLower);

    if (user) {
      saveCurrentUser(user);
      showAlert('success', `Welcome back, ${user.name}!`);
      return true;
    } else {
      // Auto-register first user or notify
      showAlert('error', 'No account found with this email. Please click "Sign Up" to create an account.');
      return false;
    }
  };

  const logout = () => {
    saveCurrentUser(null);
    showAlert('info', 'You have been successfully logged out.');
  };

  // Reservations Operations
  const addReservation = (reservationData: Omit<Reservation, 'id' | 'userId' | 'createdAt' | 'status'>) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: 'res_' + Math.random().toString(36).substr(2, 9),
      userId: currentUser ? currentUser.id : null,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const updatedReservations = [newReservation, ...reservations];
    saveReservations(updatedReservations);
    showAlert('success', `Reservation confirmed for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time}!`);
  };

  const cancelReservation = (id: string) => {
    const updated = reservations.map(r => {
      if (r.id === id) {
        return { ...r, status: 'cancelled' as const };
      }
      return r;
    });
    saveReservations(updated);
    showAlert('info', 'Your reservation has been cancelled.');
  };

  // Contact Message Operations
  const addContactMessage = (messageData: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const newMessage: ContactMessage = {
      ...messageData,
      id: 'msg_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [newMessage, ...contactMessages];
    saveMessages(updatedMessages);
    showAlert('success', 'Thank you! Your message has been sent. We will get back to you shortly.');
  };

  // Review Operations
  const addReview = (name: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: 'rev_' + Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1534528741775-53994a69daeb' : '1507003211169-0a1dd7228f2d'}?auto=format&fit=crop&q=80&w=150`
    };

    const updatedReviews = [newReview, ...reviews];
    saveReviews(updatedReviews);
    showAlert('success', 'Thank you for your warm feedback!');
  };

  return (
    <CafeContext.Provider
      value={{
        activePage,
        setActivePage,
        currentUser,
        register,
        login,
        logout,
        reservations,
        addReservation,
        cancelReservation,
        menuItems: INITIAL_MENU,
        contactMessages,
        addContactMessage,
        reviews,
        addReview,
        alert,
        showAlert,
        clearAlert
      }}
    >
      {children}
    </CafeContext.Provider>
  );
};

export const useCafe = () => {
  const context = useContext(CafeContext);
  if (context === undefined) {
    throw new Error('useCafe must be used within a CafeProvider');
  }
  return context;
};
