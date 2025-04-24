import { redirect } from "react-router";
import { auth } from "~/lib/auth.server";

export async function routerGuard(request: Request) {
  const session = await auth.api.getSession(request);
  if (!session) {
    throw redirect("/login");
  }

  return session;
}
