import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/config/api.config';
import { ApiEnvelope, Hotel, HotelDetails, HotelFilters, HotelRoom, PagedResult } from './hotel.models';

@Injectable({ providedIn: 'root' })
export class HotelApiService {
  private readonly http = inject(HttpClient);

  list(page = 1, take = 12): Observable<PagedResult<Hotel>> {
    const params = new HttpParams().set('Page', page).set('Take', take);
    return this.http.get<ApiEnvelope<PagedResult<Hotel>>>(`${API_BASE_URL}/api/hotels`, { params })
      .pipe(map((response) => response.data));
  }

  search(query: string, page = 1, take = 12): Observable<PagedResult<Hotel>> {
    const params = new HttpParams().set('query', query).set('Page', page).set('Take', take);
    return this.http.get<ApiEnvelope<PagedResult<Hotel>>>(`${API_BASE_URL}/api/hotels/search`, { params })
      .pipe(map((response) => response.data));
  }

  filter(filters: HotelFilters, page = 1, take = 12): Observable<PagedResult<Hotel>> {
    let params = new HttpParams().set('Page', page).set('Take', take);
    if (filters.search) params = params.set('Search', filters.search);
    if (filters.city) params = params.set('City', filters.city);
    if (filters.minStarRating) params = params.set('MinStarRating', filters.minStarRating);
    if (filters.maxStarRating) params = params.set('MaxStarRating', filters.maxStarRating);
    if (filters.sortBy) params = params.set('SortBy', filters.sortBy);
    if (filters.sortDescending !== undefined) params = params.set('SortDescending', filters.sortDescending);
    return this.http.get<ApiEnvelope<PagedResult<Hotel>>>(`${API_BASE_URL}/api/hotels/filter`, { params })
      .pipe(map((response) => response.data));
  }

  details(hotelId: number): Observable<HotelDetails> {
    return this.http.get<ApiEnvelope<HotelDetails>>(`${API_BASE_URL}/api/hotels/${hotelId}`)
      .pipe(map((response) => response.data));
  }

  rooms(hotelId: number, page = 1, take = 12): Observable<PagedResult<HotelRoom>> {
    const params = new HttpParams().set('Page', page).set('Take', take);
    return this.http.get<ApiEnvelope<PagedResult<HotelRoom>>>(`${API_BASE_URL}/api/rooms/${hotelId}`, { params })
      .pipe(map((response) => response.data));
  }
}
