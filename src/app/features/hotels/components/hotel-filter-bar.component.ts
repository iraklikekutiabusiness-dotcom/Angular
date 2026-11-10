import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HotelFilters } from '../data-access/hotel.models';

@Component({
  selector: 'app-hotel-filter-bar',
  imports: [FormsModule],
  template: `
    <form class="filter-bar" (ngSubmit)="apply()">
      <label>Destination
        <select name="city" [ngModel]="city()" (ngModelChange)="city.set($event)">
          <option value="">All destinations</option><option value="Tbilisi">Tbilisi</option><option value="Batumi">Batumi</option><option value="Borjomi">Borjomi</option><option value="Kvareli">Kvareli</option><option value="Sighnaghi">Sighnaghi</option>
        </select>
      </label>
      <label>Hotel class
        <select name="stars" [ngModel]="rating()" (ngModelChange)="rating.set($event)">
          <option value="">Any stars</option><option value="3">3 stars</option><option value="4">4 stars</option><option value="5">5 stars</option>
        </select>
      </label>
      <label>Sort by
        <select name="sort" [ngModel]="sortBy()" (ngModelChange)="sortBy.set($event)">
          <option value="">Recommended</option><option value="averageRating">Top rated</option><option value="name">Name A–Z</option>
        </select>
      </label>
      <button class="apply" type="submit">Apply filters</button>
      <button class="reset" type="button" (click)="reset()">Reset</button>
    </form>
  `,
  styles: [`
    :host { display:block; }
    .filter-bar { display:flex; flex-wrap:wrap; align-items:end; gap:12px; padding:15px; border:1px solid #e8edf3; border-radius:14px; background:#fff; }
    label { flex:1 1 150px; display:grid; gap:6px; color:#758298; font-size:10px; font-weight:750; letter-spacing:.4px; text-transform:uppercase; }
    select { width:100%; height:41px; padding:0 10px; border:1px solid #e1e7ef; border-radius:9px; color:#27354b; background:#fff; font:inherit; font-size:12px; text-transform:none; }
    button { height:41px; padding:0 15px; border-radius:9px; font:inherit; font-size:11px; font-weight:700; cursor:pointer; }
    .apply { border:0; color:#fff; background:#1263eb; }.reset { border:1px solid #e1e7ef; color:#647187; background:#fff; }
  `],
})
export class HotelFilterBarComponent {
  readonly applied = output<HotelFilters>();
  readonly city = signal('');
  readonly rating = signal('');
  readonly sortBy = signal('');

  apply(): void {
    this.applied.emit({
      city: this.city() || undefined,
      minStarRating: this.rating() ? Number(this.rating()) : undefined,
      maxStarRating: this.rating() ? Number(this.rating()) : undefined,
      sortBy: this.sortBy() || undefined,
      sortDescending: this.sortBy() === 'averageRating',
    });
  }

  reset(): void {
    this.city.set(''); this.rating.set(''); this.sortBy.set(''); this.applied.emit({});
  }
}
