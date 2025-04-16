import { extractText, getDocumentProxy } from "unpdf";
import { auth } from "~/lib/auth.server";
import { prisma } from "~/lib/prisma";

export async function insertReportOnStudent(
  request: Request,
  formData: FormData,
  id: string
) {
  const arquivo = formData.get("file") as File;
  console.log("arquivo", arquivo);
  if (!arquivo || !(arquivo instanceof File)) {
    return { error: "Arquivo não enviado" };
  }

  const fileName = arquivo.name;

  console.log("fileName", fileName);

  const arrayBuffer = await arquivo.arrayBuffer();
  const arrayBufferCopy = arrayBuffer.slice(0);
  const pdf = await getDocumentProxy(arrayBuffer);

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
      content: new Uint8Array(arrayBufferCopy),
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
