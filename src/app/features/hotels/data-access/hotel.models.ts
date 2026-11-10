export interface HotelAddress {
  id?: number;
  street: string | null;
  city: string | null;
  country: string | null;
  zipCode?: string | null;
  state?: string | null;
}

export interface Hotel {
  id: number;
  name: string | null;
  starRating: number;
  thumbnail: string | null;
  averageRating: number | null;
  reviewCount: number;
  roomCount: number;
  address: HotelAddress | null;
}

export interface HotelDetails extends Hotel {
  description: string | null;
  phoneNumber: string | null;
  email: string | null;
  gallery: string[] | null;
  specifications: Record<string, unknown> | null;
}

export interface HotelRoom {
  id: number;
  roomNumber: string | null;
  roomType: string | null;
  pricePerNight: number;
  capacity: number;
  bedCount: number;
  isAvailable: boolean;
  thumbnail: string | null;
  averageRating: number;
  reviewCount: number;
}

export interface PagedResult<T> {
  items: T[] | null;
  currentPage: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiEnvelope<T> {
  data: T;
}

export interface HotelFilters {
  search?: string;
  city?: string;
  minStarRating?: number;
  maxStarRating?: number;
  sortBy?: string;
  sortDescending?: boolean;
}
