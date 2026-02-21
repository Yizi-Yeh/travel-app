import { render, screen } from "@testing-library/react";
import { HomeContent } from "@/components/home/HomeContent";

it("does not render quick entry", () => {
  render(<HomeContent isAuthenticated={true} trips={[]} />);
  expect(screen.queryByText("快速入口")).toBeNull();
});
