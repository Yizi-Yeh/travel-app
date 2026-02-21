# Japanese Fresh UI Refresh (Theme + Layout)

## Goal
Refresh the UI to a Japanese clean aesthetic across the entire app without changing behavior. Ensure each route’s main content renders inside a centered, fixed-width (1200px) content area so page transitions feel consistent and do not “jump” visually.

## Non-Goals
- No new features or data changes.
- No route logic changes.
- No functional refactors.

## Architecture
- Keep the existing Next.js + MUI stack.
- Update the global MUI theme for palette, typography, spacing, and component overrides.
- Apply a single shared layout wrapper that constrains content to a 1200px max width and centers it.
- Add a global background layer with a light gradient and subtle “washi paper” texture.

## Visual Direction
- Low-saturation, airy palette.
- High readability, soft contrast.
- Consistent elevation and borders (soft edges, light shadows).

## Components & Styling
- Theme palette: define `primary`, `secondary`, `background`, `text`, `divider`.
- Theme overrides for core components: `AppBar`, `Button`, `Card`, `TextField`, `Paper`, `Divider`.
- Content wrapper: consistent padding and a soft container surface.
- Background: global gradient plus subtle texture layer.

## Data Flow / Behavior
- No changes to data flow or behavior.
- Layout only; route switches remain but visual structure stays stable.

## Error Handling
- No changes.

## Testing
- Manual visual spot-check across key pages after changes.

## Rollout
- Single PR: theme + layout updates, no feature changes.
