import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, distinctUntilChanged, forkJoin, map, of, startWith, switchMap } from 'rxjs';
import { SiteHeaderComponent } from '../components/site-header.component';
import { HotelDetailContentComponent } from '../components/hotel-detail-content.component';
import { HotelApiService } from '../data-access/hotel-api.service';
import { HotelDetails, HotelRoom } from '../data-access/hotel.models';

interface DetailState {
  loading: boolean;
  error: string;
  hotel: HotelDetails | null;
  rooms: HotelRoom[];
}

const INITIAL_STATE: DetailState = { loading: true, error: '', hotel: null, rooms: [] };

@Component({
  selector: 'app-hotel-detail-page',
  imports: [HotelDetailContentComponent, RouterLink, SiteHeaderComponent],
  templateUrl: './hotel-detail-page.component.html',
  styleUrl: './hotel-detail-page.component.scss',
})
export class HotelDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly hotelApi = inject(HotelApiService);

  readonly state = toSignal(
    this.route.paramMap.pipe(
      map((params) => Number(params.get('hotelId'))),
      distinctUntilChanged(),
      switchMap((hotelId) => {
        if (!Number.isInteger(hotelId) || hotelId < 1) {
          return of<DetailState>({ loading: false, error: 'That hotel address is not valid.', hotel: null, rooms: [] });
        }
        return forkJoin({
          hotel: this.hotelApi.details(hotelId),
          rooms: this.hotelApi.rooms(hotelId).pipe(catchError(() => of({ items: [] as HotelRoom[] }))),
        }).pipe(
          map(({ hotel, rooms }) => ({ loading: false, error: '', hotel, rooms: rooms.items ?? [] } satisfies DetailState)),
          startWith(INITIAL_STATE),
          catchError(() => of<DetailState>({ loading: false, error: 'We couldn’t find that hotel. It may have been removed.', hotel: null, rooms: [] })),
        );
      }),
    ),
    { initialValue: INITIAL_STATE },
  );
}
