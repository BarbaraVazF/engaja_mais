import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function addStudent(request: Request, body: FormData) {
  const name = body.get("nome")?.toString()!;
  const session = await auth.api.getSession(request);
  const id = session!.user.id;

  const student = await prisma.student.create({
    data: {
      name,
      registeredBy: {
        connect: {
          id,
        },
      },
    },
  });

  return student;
}
