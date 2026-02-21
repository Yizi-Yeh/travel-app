import { render, screen } from "@testing-library/react";
import { ModulePage } from "@/components/modules/ModulePage";

it("renders module title", () => {
  render(<ModulePage module="todo" />);
  expect(screen.getByText("待辦事項")).toBeInTheDocument();
});
