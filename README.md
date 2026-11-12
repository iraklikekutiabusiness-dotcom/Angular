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

The hotel feature calls the STEP Booking API for hotel listing, search, filters, hotel details, and rooms belonging to a hotel. Set a valid `X-STEP-KEY` locally in `src/app/core/config/api.config.ts` before running the app. Do not commit the key: browser app source is public. For a public production app, send API requests through a server-side proxy.
"# Angular" 
