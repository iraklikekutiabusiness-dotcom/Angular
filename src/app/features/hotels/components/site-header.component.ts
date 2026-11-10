import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  template: `
    <header class="site-header">
      <a class="brand" routerLink="/" aria-label="STEP Booking home"><span class="brand-icon">⌂</span><span>step<span class="brand-light">booking</span></span></a>
      <a class="header-cta" routerLink="/">Explore stays <span>↗</span></a>
    </header>
  `,
  styles: [`
    :host { display:block; border-bottom:1px solid #edf0f4; background:#fff; }
    .site-header { max-width:1200px; height:76px; margin:auto; padding:0 32px; display:flex; align-items:center; justify-content:space-between; }
    .brand { display:flex; align-items:center; gap:10px; color:#172137; font-size:18px; font-weight:800; letter-spacing:-.7px; text-decoration:none; }
    .brand-icon { width:39px; height:39px; display:grid; place-items:center; border-radius:12px; color:#fff; background:#1263eb; font-size:25px; font-weight:500; }
    .brand-light { color:#627086; font-weight:500; }
    .header-cta { color:#47566e; font-size:12px; font-weight:700; text-decoration:none; }
    .header-cta span { padding-left:5px; color:#1263eb; font-size:15px; }
    @media(max-width:600px) { .site-header { height:66px; padding:0 20px; } }
  `],
})
export class SiteHeaderComponent {}
