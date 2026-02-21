# Japanese Fresh UI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Apply a Japanese clean visual theme and a centered 1200px main content layout across all routes without changing behavior.

**Architecture:** Use MUI theme overrides for palette and core component styling, add global background styles via `MuiCssBaseline`, and wrap main content in a shared 1200px container (likely in `AppShell`) to keep routes visually consistent.

**Tech Stack:** Next.js 14, React 18, MUI v5, TypeScript.

---

### Task 1: Audit layout usage and pick the shared container point

**Files:**
- Modify: `src/components/AppShell.tsx`
- Read: `src/app/trip/*/page.tsx`

**Step 1: Confirm all route pages use `AppShell`**
Run: `rg -n "<AppShell" src/app`
Expected: All route pages listed. If any route page lacks `AppShell`, list it for updates in Task 3.

**Step 2: Decide container insertion point**
Action: Choose to wrap the `{children}` area in `AppShell` with a fixed-width container to affect all routes.
Expected: Container will be inside the main content area (`<Box sx={{ flexGrow: 1, p: 2 }}>`).

**Step 3: Commit audit notes**
Action: If any page is missing `AppShell`, note file paths in the Task 3 section below.

### Task 2: Update global MUI theme for Japanese clean palette and component defaults

**Files:**
- Modify: `src/theme.ts`

**Step 1: Add palette + typography + shape defaults**
Update `src/theme.ts` to include a low-saturation palette, soft divider, and readable text.

```ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans TC", "Noto Sans JP", sans-serif',
  },
  shape: { borderRadius: 12 },
  palette: {
    mode: "light",
    primary: { main: "#2E4A44", contrastText: "#F7F5F0" },
    secondary: { main: "#5F7A73" },
    background: { default: "#F4F2EE", paper: "#FAF9F7" },
    text: { primary: "#1F2A28", secondary: "#4B5C58" },
    divider: "#E3E0DA",
  },
});
```

**Step 2: Add component overrides for consistent surfaces**
Extend `createTheme` with `components` overrides to unify MUI defaults.

```ts
components: {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: "#F4F2EE",
        backgroundImage:
          "radial-gradient(1200px 600px at 10% -10%, rgba(255,255,255,0.7), transparent 60%)," +
          "radial-gradient(900px 500px at 90% -20%, rgba(255,255,255,0.55), transparent 60%)," +
          "linear-gradient(180deg, #F4F2EE 0%, #F1EEE8 100%)",
        color: "#1F2A28",
      },
      "*::selection": {
        backgroundColor: "#C7D7D1",
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: "#FAF9F7",
        color: "#1F2A28",
        boxShadow: "0 2px 12px rgba(31,42,40,0.08)",
        borderBottom: "1px solid #E3E0DA",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: "none",
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        border: "1px solid #E3E0DA",
        boxShadow: "0 6px 20px rgba(31,42,40,0.08)",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 999,
        textTransform: "none",
        fontWeight: 600,
      },
      containedPrimary: {
        boxShadow: "0 6px 16px rgba(46,74,68,0.2)",
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: "outlined",
      size: "medium",
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
      },
      notchedOutline: {
        borderColor: "#DED9D2",
      },
    },
  },
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: "#E3E0DA",
      },
    },
  },
},
```

**Step 3: Commit theme changes**
```bash
git add src/theme.ts
git commit -m "feat: apply Japanese clean theme palette"
```

### Task 3: Add a shared 1200px centered content container

**Files:**
- Modify: `src/components/AppShell.tsx`
- Modify (if needed): `src/app/trip/*/page.tsx`

**Step 1: Wrap main content with a container**
Update the content area in `AppShell` to constrain width and center.

```tsx
<Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
  <Box
    sx={{
      maxWidth: 1200,
      mx: "auto",
      width: "100%",
    }}
  >
    {children}
  </Box>
</Box>
```

**Step 2: If any route page is missing `AppShell`, wrap it**
For each missing page from Task 1, wrap content in `<AppShell title="...">` using existing titles.

**Step 3: Commit layout changes**
```bash
git add src/components/AppShell.tsx src/app/trip/*/page.tsx
git commit -m "feat: center main content to 1200px"
```

### Task 4: Manual visual verification

**Files:**
- None

**Step 1: Run the dev server**
```bash
npm run dev
```
Expected: App loads with soft background and consistent centered layout.

**Step 2: Spot-check key pages**
Check home page and several trip routes to verify color harmony and container alignment.

**Step 3: Note any visual regressions**
If needed, capture 1-2 small tweaks as follow-up tasks.

**Step 4: Commit any polish**
```bash
git add -A
git commit -m "chore: polish Japanese clean UI"
```
