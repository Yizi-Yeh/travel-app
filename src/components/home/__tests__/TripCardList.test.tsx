import { render, screen } from "@testing-library/react";
import { TripCardList } from "@/components/home/TripCardList";

it("renders trip name", () => {
  render(
    <TripCardList
      trips={[{ id: "1", name: "Tokyo", location: "東京", period: { startDate: "2026-03-01", endDate: "2026-03-03" } }]}
    />
  );
  expect(screen.getByText("Tokyo")).toBeInTheDocument();
});
