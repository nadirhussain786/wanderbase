export interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  category: string[];
  description: string;
  highlights: string[];
  featured: boolean;
}

export interface TourPackage {
  id: string;
  title: string;
  destination: string;
  image: string;
  images: string[];
  price: number;
  originalPrice: number;
  duration: string;
  groupSize: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  rating: number;
  reviews: number;
  includes: string[];
  itinerary: ItineraryDay[];
  category: string;
  badge?: string;
  departure: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  review: string;
  tour: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  location: string;
  category: string;
}

export interface BookingFormData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  tourType: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface Stat {
  value: string;
  label: string;
  icon: string;
}
