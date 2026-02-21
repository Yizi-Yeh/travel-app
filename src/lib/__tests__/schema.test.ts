import { readFileSync } from "fs";

it("schema includes Trip model", () => {
  const schema = readFileSync("prisma/schema.prisma", "utf8");
  expect(schema).toContain("model Trip");
});
