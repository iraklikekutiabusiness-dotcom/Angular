import { Component, computed, input } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HotelDetails, HotelRoom } from '../data-access/hotel.models';

@Component({
  selector: 'app-hotel-detail-content',
  imports: [CurrencyPipe, DecimalPipe, RouterLink],
  template: `
    <div class="crumbs"><a routerLink="/">Hotels</a><span>›</span><span>{{ hotel().address?.city || 'Georgia' }}</span></div>
    <div class="title-row">
      <div><span class="eyebrow">{{ hotel().starRating }} STAR HOTEL</span><h1>{{ hotel().name }}</h1><div class="subline"><span class="pin">⌖</span>{{ hotel().address?.street }}<span>·</span>{{ hotel().address?.city }}, {{ hotel().address?.country }}</div></div>
      <div class="score"><strong>{{ hotel().averageRating ?? 0 | number:'1.1-1' }}</strong><span>Excellent</span><small>{{ hotel().reviewCount }} reviews</small></div>
    </div>

    <section class="gallery" [class.one-photo]="images().length < 2" aria-label="Hotel photos">
      @for (image of images(); track image; let i = $index) { <img [class.main-photo]="i === 0" [src]="image" [alt]="hotel().name + ' photo ' + (i + 1)" [loading]="i === 0 ? 'eager' : 'lazy'" /> }
    </section>

    <div class="columns">
      <div class="main-column">
        <section class="content-section overview"><span class="section-kicker">WELCOME TO</span><h2>About this stay</h2><p>{{ hotel().description || 'A comfortable place to unwind and enjoy your time in Georgia.' }}</p></section>
        @if (amenities().length) {
          <section class="content-section"><span class="section-kicker">THE GOOD STUFF</span><h2>What this hotel offers</h2><div class="amenities">@for (amenity of amenities(); track amenity) { <span><i>✓</i>{{ amenity }}</span> }</div></section>
        }
        <section class="content-section room-section"><div class="room-heading"><div><span class="section-kicker">MAKE YOURSELF AT HOME</span><h2>Available rooms</h2></div><span class="room-total">{{ rooms().length }} rooms</span></div>
          @if (rooms().length) {
            <div class="room-list">@for (room of rooms(); track room.id) {
              <article class="room-card">
                <div class="room-image">@if (room.thumbnail) { <img [src]="room.thumbnail" [alt]="room.roomType || 'Hotel room'" loading="lazy" /> } @else { <span>✦</span> }</div>
                <div class="room-info"><span class="room-type">{{ room.roomType || 'Guest room' }}</span><h3>Room {{ room.roomNumber || room.id }}</h3><p>{{ room.capacity }} guests <span>·</span> {{ room.bedCount }} {{ room.bedCount === 1 ? 'bed' : 'beds' }}</p><span class="availability" [class.unavailable]="!room.isAvailable"><i></i>{{ room.isAvailable ? 'Available' : 'Currently unavailable' }}</span></div>
                <div class="room-price"><strong>{{ room.pricePerNight | currency:'GEL':'symbol':'1.0-0' }}</strong><small>per night</small></div>
              </article>
            }</div>
          } @else { <div class="no-rooms">No room details are available for this hotel right now.</div> }
        </section>
      </div>
      <aside class="contact-card"><span class="section-kicker">PLAN YOUR VISIT</span><h2>Hotel details</h2>
        <div class="contact-row"><span class="contact-icon">⌖</span><div><small>Address</small><b>{{ hotel().address?.street || 'Address not listed' }}</b><span>{{ hotel().address?.city }}, {{ hotel().address?.country }}</span></div></div>
        @if (hotel().phoneNumber) { <div class="contact-row"><span class="contact-icon">⌕</span><div><small>Phone</small><a [href]="'tel:' + hotel().phoneNumber">{{ hotel().phoneNumber }}</a></div></div> }
        @if (hotel().email) { <div class="contact-row"><span class="contact-icon">✉</span><div><small>Email</small><a [href]="'mailto:' + hotel().email">{{ hotel().email }}</a></div></div> }
        <div class="contact-foot">{{ hotel().roomCount }} rooms <span>·</span> {{ hotel().starRating }} star property</div>
      </aside>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .crumbs { display:flex; align-items:center; gap:9px; margin:22px 0 24px; color:#9aa5b3; font-size:10px; }.crumbs a { color:#58749d; text-decoration:none; }.crumbs span:nth-child(2) { color:#c3cad3; }
    .title-row { display:flex; justify-content:space-between; align-items:end; gap:20px; margin-bottom:22px; }.eyebrow,.section-kicker { color:#6983aa; font-size:9px; font-weight:800; letter-spacing:1.45px; }.title-row h1 { margin:7px 0 8px; color:#19253a; font-size:clamp(28px,4vw,42px); line-height:1.1; letter-spacing:-1.6px; }.subline { display:flex; align-items:center; gap:6px; color:#78869a; font-size:11px; }.pin { color:#2775dc; font-size:14px; }.score { min-width:100px; display:grid; justify-items:end; gap:2px; }.score strong { color:#19253a; font-size:23px; }.score span { color:#49805d; font-size:10px; font-weight:750; }.score small { color:#97a2b1; font-size:9px; }
    .gallery { height:360px; display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:1fr 1fr; gap:8px; overflow:hidden; border-radius:16px; background:#eff3f6; }.gallery img { width:100%; height:100%; min-height:0; object-fit:cover; }.gallery .main-photo { grid-row:span 2; }.gallery.one-photo { grid-template-columns:1fr; grid-template-rows:1fr; }.gallery.one-photo img:not(.main-photo) { display:none; }
    .columns { display:grid; grid-template-columns:minmax(0,1fr) 290px; align-items:start; gap:32px; margin-top:26px; }.main-column { min-width:0; }.content-section { padding:23px 0 27px; border-bottom:1px solid #edf0f4; }.content-section h2,.contact-card h2 { margin:7px 0 12px; color:#202c41; font-size:20px; letter-spacing:-.5px; }.overview p { max-width:760px; color:#66748a; font-size:12px; line-height:1.8; }.amenities { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:13px; margin-top:15px; }.amenities span { display:flex; align-items:center; gap:8px; color:#5e6e82; font-size:11px; }.amenities i { width:21px; height:21px; display:grid; place-items:center; border-radius:50%; color:#2d8a65; background:#eaf5ef; font-size:11px; font-style:normal; }
    .room-heading { display:flex; justify-content:space-between; align-items:end; margin-bottom:15px; }.room-heading h2 { margin-bottom:0; }.room-total { color:#91a0b1; font-size:10px; }.room-list { display:grid; gap:12px; }.room-card { display:grid; grid-template-columns:136px minmax(0,1fr) auto; align-items:center; gap:14px; padding:10px; border:1px solid #e9edf2; border-radius:13px; }.room-image { height:104px; display:grid; place-items:center; overflow:hidden; border-radius:9px; color:#fff; background:linear-gradient(145deg,#d6e4e9,#98b0b8); }.room-image img { width:100%; height:100%; object-fit:cover; }.room-type { color:#8b98aa; font-size:9px; font-weight:700; text-transform:uppercase; letter-spacing:.8px; }.room-info h3 { margin:5px 0; color:#243147; font-size:14px; }.room-info p { margin:0 0 9px; color:#8491a2; font-size:10px; }.room-info p span { padding:0 3px; }.availability { display:flex; align-items:center; gap:5px; color:#43815f; font-size:9px; font-weight:700; }.availability i { width:6px; height:6px; border-radius:50%; background:#46a879; }.availability.unavailable { color:#ae6c58; }.availability.unavailable i { background:#c47763; }.room-price { display:grid; justify-items:end; gap:3px; }.room-price strong { color:#1d2a40; font-size:15px; }.room-price small { color:#9aa5b2; font-size:9px; }.no-rooms { padding:20px; border:1px dashed #dce3ec; border-radius:12px; color:#8491a2; font-size:11px; }
    .contact-card { position:sticky; top:20px; padding:20px; border:1px solid #e9edf2; border-radius:15px; background:#fff; box-shadow:0 8px 25px #2135510a; }.contact-card h2 { margin-bottom:18px; }.contact-row { display:flex; gap:10px; padding:13px 0; border-top:1px solid #f0f2f5; }.contact-icon { width:29px; height:29px; display:grid; place-items:center; flex:none; border-radius:9px; color:#2c73d7; background:#eef4ff; font-size:15px; }.contact-row div { min-width:0; display:grid; gap:3px; }.contact-row small { color:#9ba5b1; font-size:9px; }.contact-row b,.contact-row a,.contact-row div>span { overflow-wrap:anywhere; color:#56657a; font-size:10px; font-weight:600; text-decoration:none; }.contact-row div>span { color:#8894a4; font-weight:400; }.contact-foot { margin-top:9px; padding-top:13px; border-top:1px solid #f0f2f5; color:#819080; font-size:9px; }.contact-foot span { padding:0 5px; color:#bac2cb; }
    @media(max-width:850px) { .columns { grid-template-columns:minmax(0,1fr) 250px; gap:20px; }.gallery { height:300px; }.room-card { grid-template-columns:110px minmax(0,1fr) auto; gap:10px; }.room-image { height:90px; } }
    @media(max-width:650px) { .crumbs { margin:17px 0 19px; }.title-row { align-items:center; margin-bottom:16px; }.title-row h1 { font-size:27px; letter-spacing:-.8px; }.subline { flex-wrap:wrap; font-size:9px; }.score { min-width:66px; }.score strong { font-size:19px; }.score span,.score small { font-size:8px; }.gallery { height:245px; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:5px; border-radius:12px; }.gallery .main-photo { grid-row:span 2; }.gallery img:nth-child(n+4) { display:none; }.columns { grid-template-columns:1fr; gap:15px; margin-top:14px; }.contact-card { grid-row:1; position:static; padding:16px; }.contact-card h2 { font-size:17px; margin-bottom:10px; }.contact-row { padding:9px 0; }.contact-foot { padding-top:9px; }.main-column { grid-row:2; }.content-section { padding:18px 0 20px; }.content-section h2 { font-size:18px; }.amenities { gap:10px; }.amenities span { font-size:10px; }.room-card { grid-template-columns:95px minmax(0,1fr); position:relative; padding:8px; }.room-image { height:88px; }.room-price { grid-column:2; grid-row:2; justify-items:start; display:flex; align-items:baseline; gap:6px; }.room-info p { margin-bottom:6px; }.room-info h3 { font-size:12px; }.room-info { align-self:end; }.room-card { row-gap:5px; }.room-price strong { font-size:13px; } }
  `],
})
export class HotelDetailContentComponent {
  readonly hotel = input.required<HotelDetails>();
  readonly rooms = input<HotelRoom[]>([]);
  readonly images = computed(() => {
    const hotel = this.hotel();
    return [...new Set([...(hotel.gallery ?? []), hotel.thumbnail ?? ''].filter(Boolean))].slice(0, 5);
  });
  readonly amenities = computed(() => Object.entries(this.hotel().specifications ?? {})
    .filter(([, enabled]) => enabled === true)
    .map(([name]) => name.replace(/([A-Z])/g, ' $1').trim()));
}
