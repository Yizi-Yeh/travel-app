# Homepage Overview Design

## Summary
Update the Japan Trip PWA homepage to show a full trip overview and a 13-item quick entry grid, with Google login entry points in both the AppBar and main content when logged out. Data is loaded server-side from PostgreSQL for immediate freshness.

## Goals
- Homepage shows all trips as cards with name, location, and date range.
- Provide 13 quick-entry routes on homepage.
- Show Google login at AppBar right and a large CTA when logged out.

## Non-Goals
- Offline homepage data source (kept online API/SSR only).
- Complex personalization or sorting beyond showing all trips.

## Architecture
- Server Component homepage fetches session and trips.
- Client components handle UI and routing only.
- Trips queried with Prisma and include TripPeriod for date range.

## Data Model Changes
- Add `Trip.location: String?`.

## UI Structure
- AppBar: title + login/logout button.
- Logged out: SignInPanel with CTA.
- Logged in: TripCardList + QuickEntryGrid (13 routes).

## API Changes
- /api/trips POST/PATCH accept `location`.
- /api/trips GET includes TripPeriod data.

## Testing (Minimal)
- Rendering tests for homepage: logged-out CTA visible; logged-in shows trip cards.
- API tests for location field pass-through.

## Open Questions
- None.
