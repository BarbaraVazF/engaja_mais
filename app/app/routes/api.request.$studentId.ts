import { insertRequest } from "~/api/insertRequest.server";
import type { Route } from "./+types/api.request.$studentId";

export async function action({ request, params }: Route.ActionArgs) {
  const body = await request.json();
  console.log("body", body, params);
  await insertRequest(request, params.studentId!, body);
}
