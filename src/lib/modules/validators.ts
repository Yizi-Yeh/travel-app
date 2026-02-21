import type { ModuleConfig } from "@/lib/modules/registry";

export function validateRequiredFields(config: ModuleConfig, data: Record<string, unknown>) {
  const missing = config.fields
    .filter((field) => field.required)
    .filter((field) => data[field.name] === undefined || data[field.name] === null || data[field.name] === "");

  if (missing.length > 0) {
    const names = missing.map((field) => field.name).join(", ");
    throw new Error(`Missing required fields: ${names}`);
  }
}
