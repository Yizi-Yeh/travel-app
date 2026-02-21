# Drawer Navigation Design

## Summary
Replace homepage quick-entry grid with a Drawer-based navigation. Drawer is persistent on desktop and temporary on mobile, triggered by an AppBar hamburger. All 13 routes live in the Drawer.

## Goals
- Drawer navigation for all 13 routes.
- Desktop: persistent drawer.
- Mobile: temporary drawer (left slide-out).
- AppBar with hamburger on mobile only.
- Remove quick-entry section from homepage.

## Non-Goals
- Removing QuickEntryGrid component (kept for potential future reuse).

## Architecture
- AppShell owns Drawer state and breakpoint switching.
- NavList renders module routes from `listModules()`.
- HomeContent removes QuickEntryGrid section.

## Components
- New: `NavList` component for navigation list.
- Updated: `AppShell` to render Drawer and adjust content layout.
- Updated: `HomeContent` to remove quick-entry section.

## Interaction
- Mobile: hamburger toggles temporary drawer; closes on nav click.
- Desktop: persistent drawer with fixed width; content offset.

## Open Questions
- None.
