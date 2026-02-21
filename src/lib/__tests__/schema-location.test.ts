import { readFileSync } from "fs";

it("schema includes Trip.location", () => {
  const schema = readFileSync("prisma/schema.prisma", "utf8");
  expect(schema).toContain("location");
});
