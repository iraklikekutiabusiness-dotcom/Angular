import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hotel-search',
  imports: [FormsModule],
  template: `
    <form class="search-box" (ngSubmit)="submit()">
      <span class="search-icon" aria-hidden="true">⌕</span>
      <input name="query" [ngModel]="query()" (ngModelChange)="query.set($event)" placeholder="Search by hotel name or destination" aria-label="Search hotels" />
      @if (query()) { <button class="clear" type="button" aria-label="Clear search" (click)="query.set(''); search.emit('')">×</button> }
      <button class="search-button" type="submit">Search <span>→</span></button>
    </form>
  `,
  styles: [`
    :host { display:block; width:min(620px,100%); }
    .search-box { height:62px; display:flex; align-items:center; gap:12px; padding:7px 8px 7px 17px; border:1px solid #e3e9f1; border-radius:15px; background:#fff; box-shadow:0 10px 28px #26395612; }
    .search-icon { color:#91a0b3; font-size:25px; line-height:1; }
    input { flex:1; min-width:0; border:0; outline:0; color:#24334a; background:transparent; font:inherit; font-size:14px; }
    input::placeholder { color:#9aa6b7; }
    .clear { border:0; color:#8d98a9; background:none; font-size:20px; cursor:pointer; }
    .search-button { padding:13px 18px; border:0; border-radius:10px; color:#fff; background:#1263eb; font:inherit; font-size:13px; font-weight:700; cursor:pointer; }
    .search-button span { margin-left:10px; font-size:17px; }
    @media(max-width:600px) { .search-box { height:49px; padding:4px 5px 4px 12px; gap:8px; border-radius:10px; box-shadow:none; }.search-icon { display:none; }.search-button { padding:10px 14px; border-radius:8px; font-size:12px; }.search-button span { display:none; } }
  `],
})
export class HotelSearchComponent {
  readonly search = output<string>();
  readonly query = model('');

  submit(): void { this.search.emit(this.query().trim()); }
}
