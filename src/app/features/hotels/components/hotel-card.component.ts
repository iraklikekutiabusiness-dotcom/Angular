import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Hotel } from '../data-access/hotel.models';

@Component({
  selector: 'app-hotel-card',
  imports: [DecimalPipe, RouterLink],
  template: `
    <article class="card">
      <a class="photo" [routerLink]="['/hotels', hotel().id]" [attr.aria-label]="'View ' + hotel().name">
        @if (hotel().thumbnail) { <img [src]="hotel().thumbnail" [alt]="hotel().name ?? 'Hotel'" loading="lazy" /> } @else { <span class="no-photo">✦</span> }
        <span class="stars">{{ hotel().starRating }} <b>★</b></span>
        <span class="photo-count">{{ hotel().roomCount }} rooms</span>
      </a>
      <div class="body">
        <div class="location"><span>⌖</span> {{ hotel().address?.city || 'Georgia' }}, {{ hotel().address?.country || 'Georgia' }}</div>
        <a class="name" [routerLink]="['/hotels', hotel().id]">{{ hotel().name }}</a>
        <div class="rating"><b>{{ hotel().averageRating ?? 0 | number:'1.1-1' }}</b><span class="rating-stars">★ ★ ★ ★ ★</span><span class="reviews">({{ hotel().reviewCount }} reviews)</span></div>
        <div class="bottom"><span><i></i> Guest favourite</span><a [routerLink]="['/hotels', hotel().id]">View stay <b>↗</b></a></div>
      </div>
    </article>
  `,
  styles: [`
    :host { display:block; min-width:0; }
    .card { height:100%; overflow:hidden; border:1px solid #e8edf2; border-radius:16px; background:#fff; box-shadow:0 5px 16px #1b2d4509; transition:transform .2s,box-shadow .2s; }
    .card:hover { transform:translateY(-3px); box-shadow:0 14px 28px #1b2d4518; }
    .photo { height:210px; position:relative; display:grid; place-items:center; overflow:hidden; color:#fff; background:linear-gradient(140deg,#cadde3,#8cabb0); text-decoration:none; }
    .photo img { width:100%; height:100%; object-fit:cover; transition:transform .4s; }.card:hover .photo img { transform:scale(1.04); }
    .no-photo { font-size:36px; }.photo:after { content:''; position:absolute; inset:55% 0 0; background:linear-gradient(transparent,#10203470); pointer-events:none; }
    .stars { position:absolute; top:12px; left:12px; z-index:1; padding:6px 9px; border-radius:8px; color:#fff; background:#1d293bc9; font-size:11px; font-weight:750; }.stars b { color:#ffd46e; }
    .photo-count { position:absolute; right:12px; bottom:12px; z-index:1; font-size:10px; font-weight:650; text-shadow:0 1px 6px #000; }
    .body { padding:15px 16px 13px; }.location { color:#8290a2; font-size:10px; font-weight:600; }.location span { color:#3678d7; font-size:13px; }
    .name { min-height:44px; display:block; margin:8px 0 7px; color:#1c283c; font-size:15px; line-height:1.4; font-weight:750; text-decoration:none; }.name:hover { color:#1263eb; }
    .rating { display:flex; align-items:center; gap:6px; font-size:10px; }.rating>b { color:#243249; }.rating-stars { color:#e9af42; letter-spacing:1px; }.reviews { color:#9aa4b2; }
    .bottom { display:flex; align-items:center; justify-content:space-between; gap:6px; margin-top:13px; padding-top:10px; border-top:1px solid #eff2f5; color:#829181; font-size:9px; }.bottom i { display:inline-block; width:6px; height:6px; margin-right:4px; border-radius:50%; background:#54a280; }.bottom a { color:#1263eb; font-size:10px; font-weight:750; text-decoration:none; }.bottom a b { padding-left:3px; font-size:13px; }
    @media(max-width:620px) { .photo { height:205px; } }
  `],
})
export class HotelCardComponent {
  readonly hotel = input.required<Hotel>();
}
