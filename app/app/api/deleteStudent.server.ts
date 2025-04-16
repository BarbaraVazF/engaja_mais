import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function deleteStudent(id: string, request: Request) {
  const session = await auth.api.getSession(request);

  const user_id = session!.user.id;
  console.log(id);
  await prisma.student.delete({
    where: {
      id,
    },
    include: {
      requests: true,
      report: true,
    },
  });
  return {};
}
