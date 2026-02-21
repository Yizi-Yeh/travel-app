import { readFileSync } from "fs";

it("has manifest", () => {
  const manifest = JSON.parse(readFileSync("public/manifest.json", "utf8"));
  expect(manifest.name).toContain("Japan");
});
