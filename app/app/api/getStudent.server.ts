import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function getStudent(id: string, request: Request) {
  const session = await auth.api.getSession(request);

  const user_id = session!.user.id;

  const student = await prisma.student.findFirst({
    where: {
      id,
      registeredBy: {
        id: user_id,
      },
    },
    include: {
      requests: true,
      report: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
  });
  return student;
}
