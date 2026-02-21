import { readFileSync } from "fs";

it("documents setup", () => {
  const readme = readFileSync("README.md", "utf8");
  expect(readme).toContain("NextAuth");
});
