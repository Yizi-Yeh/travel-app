import { render, screen } from "@testing-library/react";
import { AuthButton } from "@/components/AuthButton";

it("renders sign in label", () => {
  render(<AuthButton isAuthenticated={false} />);
  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
});
