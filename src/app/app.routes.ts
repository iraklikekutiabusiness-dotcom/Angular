import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/hotels/pages/hotel-list-page.component').then((page) => page.HotelListPageComponent),
  },
  {
    path: 'hotels/:hotelId',
    loadComponent: () => import('./features/hotels/pages/hotel-detail-page.component').then((page) => page.HotelDetailPageComponent),
  },
  { path: '**', redirectTo: '' },
];
