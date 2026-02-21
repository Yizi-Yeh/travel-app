import { render, screen } from "@testing-library/react";
import { NavList } from "@/components/NavList";

it("renders module label", () => {
  render(<NavList onNavigate={() => {}} />);
  expect(screen.getByText("待辦事項")).toBeInTheDocument();
});
