# STEP Booking Angular app

The app contains a hotel discovery page and hotel detail pages at `/hotels/:hotelId`.

## Run locally

```bash
npm start
```

## Structure

- `src/app/core/` contains API configuration and the HTTP key interceptor.
- `src/app/features/hotels/pages/` contains smart route pages that own API loading and page state.
- `src/app/features/hotels/components/` contains reusable presentational components for search, filters, cards, and hotel details.
- `src/app/features/hotels/data-access/` contains typed API models and the hotel API service.

The hotel feature calls the STEP Booking API for hotel listing, search, filters, hotel details, and rooms belonging to a hotel. The `X-STEP-KEY` is configured in `src/app/core/config/api.config.ts`. Since this app runs in the browser, that key will be visible in the downloaded JavaScript; a public production app should send API requests through a server-side proxy.
