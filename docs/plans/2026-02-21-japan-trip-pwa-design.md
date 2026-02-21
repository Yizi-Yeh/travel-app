# Japan Travel PWA - Design

## Summary
A Next.js App Router PWA for managing multiple Japan trips end-to-end. Each feature module is a dedicated route. The app supports Google-only login via NextAuth.js, offline-first editing with IndexedDB, and server persistence to PostgreSQL via Prisma. Attachments (images/PDFs) are stored directly in PostgreSQL.

## Goals
- Full coverage of 13 modules as separate routes.
- Google-only authentication.
- Multi-trip and multi-user collaboration (Owner/Member).
- Mobile-first UI using MUI.
- Offline-first editing with automatic sync.
- Attachments stored in PostgreSQL.

## Non-Goals
- Complex role systems beyond Owner/Member.
- Advanced conflict resolution beyond last-write-wins.
- External object storage for attachments.

## Architecture
- Frontend: Next.js App Router (PWA enabled), MUI for UI.
- Auth: NextAuth.js with Google provider.
- Data: Prisma + PostgreSQL.
- Offline: IndexedDB for records + mutation queue.
- Sync: Background reconciliation on reconnect.

## Routes
Each module is a standalone route:
- /trip/period
- /trip/itinerary
- /trip/todo
- /trip/flight
- /trip/transport
- /trip/accommodation
- /trip/internet
- /trip/entry-qrcode
- /trip/insurance
- /trip/expense
- /trip/checklist
- /trip/shopping
- /trip/coupons

Common UI elements:
- Trip switcher in header.
- List + detail editor per module.
- Quick add for mobile.
- Attachment upload where relevant.

## Data Model (Key Entities)
Core:
- User
- Trip
- TripMember (role: OWNER | MEMBER)

Modules (all include tripId):
- TripPeriod
- ItineraryDay
- ItineraryItem
- Todo
- Flight
- Transport
- Accommodation
- InternetPlan
- EntryQRCode
- Insurance
- Expense
- ChecklistItem
- ShoppingItem
- Coupon
- Attachment (ownerType/ownerId/mime/name/size/blob(bytea)/createdAt)

## Offline Strategy
- IndexedDB stores:
  - records: latest known state for all entities.
  - mutationQueue: offline operations (create/update/delete).
- When online:
  - replay mutationQueue in order.
  - pull latest server state and overwrite records.
- Conflict resolution: last-write-wins using updatedAt.

## Attachments
- Upload stored directly into PostgreSQL (bytea/base64).
- Optional local cache in IndexedDB for offline viewing.

## Auth & Permissions
- NextAuth.js Google-only login.
- API checks session on every request.
- TripMember determines access:
  - OWNER: manage members, delete trip.
  - MEMBER: CRUD all trip data.

## API (App Router Route Handlers)
- /api/trips
- /api/trips/:id
- /api/trips/:id/members
- /api/trips/:id/<module>
- /api/attachments

All write operations accept updatedAt for LWW semantics.

## Testing (Minimal Viable)
- Permission tests for Owner vs Member.
- Offline sync tests (queue replay, LWW).
- Attachment upload/download tests.

## Open Questions
- None at this stage; proceed to implementation planning.
