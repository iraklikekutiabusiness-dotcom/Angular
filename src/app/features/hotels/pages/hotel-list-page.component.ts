import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelCardComponent } from '../components/hotel-card.component';
import { HotelFilterBarComponent } from '../components/hotel-filter-bar.component';
import { HotelSearchComponent } from '../components/hotel-search.component';
import { SiteHeaderComponent } from '../components/site-header.component';
import { HotelApiService } from '../data-access/hotel-api.service';
import { Hotel, HotelFilters, PagedResult } from '../data-access/hotel.models';

@Component({
  selector: 'app-hotel-list-page',
  imports: [HotelCardComponent, HotelFilterBarComponent, HotelSearchComponent, SiteHeaderComponent],
  templateUrl: './hotel-list-page.component.html',
  styleUrl: './hotel-list-page.component.scss',
})
export class HotelListPageComponent implements OnInit {
  private readonly hotelApi = inject(HotelApiService);
  private requestVersion = 0;

  readonly hotels = signal<Hotel[]>([]);
  readonly searchTerm = signal('');
  readonly filters = signal<HotelFilters>({});
  readonly loading = signal(true);
  readonly error = signal('');
  readonly totalCount = signal(0);

  ngOnInit(): void { this.load(this.hotelApi.list()); }

  search(term: string): void {
    this.searchTerm.set(term);
    if (this.hasFilters()) this.applyFilters(this.filters());
    else if (term) this.load(this.hotelApi.search(term));
    else this.load(this.hotelApi.list());
  }

  applyFilters(filters: HotelFilters): void {
    this.filters.set(filters);
    if (this.hasFilters() || this.searchTerm()) {
      this.load(this.hotelApi.filter({ ...filters, search: this.searchTerm() || undefined }));
    } else {
      this.load(this.hotelApi.list());
    }
  }

  private hasFilters(): boolean {
    const value = this.filters();
    return Boolean(value.city || value.minStarRating || value.sortBy);
  }

  private load(request: Observable<PagedResult<Hotel>>): void {
    const version = ++this.requestVersion;
    this.loading.set(true);
    this.error.set('');
    request.subscribe({
      next: (result) => {
        if (version !== this.requestVersion) return;
        this.hotels.set(result.items ?? []);
        this.totalCount.set(result.totalCount ?? result.items?.length ?? 0);
        this.loading.set(false);
      },
      error: () => {
        if (version !== this.requestVersion) return;
        this.hotels.set([]);
        this.totalCount.set(0);
        this.loading.set(false);
        this.error.set('We couldn’t load hotels right now. Please try again.');
      },
    });
  }
}
