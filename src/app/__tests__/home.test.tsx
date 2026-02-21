import { render, screen } from "@testing-library/react";
import { HomeContent } from "@/components/home/HomeContent";

it("renders sign-in panel when logged out", () => {
  render(<HomeContent isAuthenticated={false} trips={[]} />);
  expect(screen.getByText(/使用 Google 登入/)).toBeInTheDocument();
});
