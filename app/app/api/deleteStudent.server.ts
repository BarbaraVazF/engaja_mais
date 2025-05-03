import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function deleteStudent(id: string, request: Request) {
  const session = await auth.api.getSession(request);

  const user_id = session!.user.id;

  await prisma.requests.deleteMany({
    where: {
      student: { id },
    },
  });

  await prisma.report.deleteMany({
    where: {
      student: { id },
    },
  });

  await prisma.student.delete({
    where: {
      id,
    },
  });
  return {};
}
