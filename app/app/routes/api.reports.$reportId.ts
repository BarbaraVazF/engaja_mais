import { deleteReport } from "~/api/deleteReport.server";
import type { Route } from "./+types/api.reports.$reportId";

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method === "DELETE") {
    await deleteReport(params.reportId);
    return { success: true };
  }
}

export async function loader({ request, params }: Route.LoaderArgs) {}
