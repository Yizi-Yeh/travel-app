import { render, screen } from "@testing-library/react";
import { MemberList } from "@/components/members/MemberList";

it("renders members", () => {
  render(<MemberList members={[{ email: "a@b.com", role: "OWNER" }]} />);
  expect(screen.getByText(/a@b.com/)).toBeInTheDocument();
});
