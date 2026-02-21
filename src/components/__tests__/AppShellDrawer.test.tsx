import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/AppShell";

it("renders drawer title", () => {
  render(<AppShell title="Japan Trip">Content</AppShell>);
  expect(screen.getAllByText(/Japan Trip/i).length).toBeGreaterThan(0);
});
