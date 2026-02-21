import { render, screen } from "@testing-library/react";
import { AppShell } from "@/components/AppShell";

it("renders app title", () => {
  render(<AppShell title="Japan Trip" />);
  expect(screen.getAllByText("Japan Trip").length).toBeGreaterThan(0);
});
