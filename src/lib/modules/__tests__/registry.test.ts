import { getModuleConfig } from "@/lib/modules/registry";

it("has todo module", () => {
  expect(getModuleConfig("todo").name).toBe("todo");
});
