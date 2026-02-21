import { enqueue } from "@/lib/offline/queue";

it("enqueues mutations", async () => {
  const id = await enqueue({ op: "create", module: "todo", payload: { title: "x" } });
  expect(id).toBeTruthy();
});
