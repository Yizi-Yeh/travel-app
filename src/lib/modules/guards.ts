export function buildScopedWhere(id: string, tripId: string) {
  return { id, tripId } as const;
}

export function sanitizeUpdatePayload<T extends Record<string, unknown>>(input: T) {
  const { id: _id, tripId: _tripId, ...rest } = input;
  return rest;
}
