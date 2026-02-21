import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/AppShell";

it("renders drawer title", () => {
  render(<AppShell title="Japan Trip">Content</AppShell>);
  expect(screen.getByText(/Japan Trip/i)).toBeInTheDocument();
});
