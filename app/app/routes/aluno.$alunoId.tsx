import { Outlet } from "react-router";
import { deleteStudent } from "~/api/deleteStudent.server";
import type { Route } from "./+types/aluno.$alunoId";

export async function action({ request, params }: Route.ActionArgs) {
  if (request.method === "DELETE") {
    await deleteStudent(params.alunoId, request);
    return { success: true };
  }
}

export default function AlunoDetalhesLayout() {
  return <Outlet />;
}
