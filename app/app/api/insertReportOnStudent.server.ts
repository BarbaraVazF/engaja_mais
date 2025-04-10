import { extractText, getDocumentProxy } from "unpdf";
import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function insertReportOnStudent(
  request: Request,
  id: string,
  body: FormData
) {
  const arquivo = body.get("file");

  if (!arquivo || !(arquivo instanceof File)) {
    return { error: "Arquivo não enviado" };
  }

  const fileName = arquivo.name;

  const arrayBuffer = await arquivo.arrayBuffer();
  const clonedBuffer = arrayBuffer.slice(0);
  const uint8Array = new Uint8Array(clonedBuffer);

  const pdf = await getDocumentProxy(uint8Array);

  const { text: textContent } = await extractText(pdf, { mergePages: true });

  const session = await auth.api.getSession(request);
  const user_id = session!.user.id;

  const student = await prisma.student.findUnique({
    where: {
      id,
      registeredBy: {
        id: user_id,
      },
    },
    include: {
      report: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  return await prisma.report.create({
    data: {
      content: uint8Array,
      textContent,
      title: fileName,
      student: {
        connect: {
          id: student.id,
        },
      },
    },
  });
}
