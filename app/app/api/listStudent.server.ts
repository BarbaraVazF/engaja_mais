import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function listStudent(request: Request) {
  const session = await auth.api.getSession(request);

  const id = session!.user.id;

  const students = await prisma.student.findMany({
    where: {
      registeredBy: {
        id,
      },
    },
  });

  return students;
}
