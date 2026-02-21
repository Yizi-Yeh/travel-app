import { render, screen } from "@testing-library/react";
import { SyncStatus } from "@/components/SyncStatus";

it("shows offline label", () => {
  render(<SyncStatus status="offline" />);
  expect(screen.getByText(/offline/i)).toBeInTheDocument();
});
