import { auth } from "~/lib/auth.server";
import { openai } from "~/lib/openai";
import { prisma } from "~/lib/prisma";
import { getPropmt } from "~/lib/prompts";

interface RequestBody {
  title: string;
  categoria: string;
  meta: {
    content: string;
    lessons?: number;
  };
}

export async function insertRequest(
  request: Request,
  studentId: string,
  body: RequestBody
) {
  const session = await auth.api.getSession(request);
  const id = session!.user.id;

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
      registeredBy: {
        id,
      },
    },
    include: {
      report: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const data = await prisma.requests.create({
    data: {
      type: body.categoria,
      title: body.title,
      meta: JSON.parse(JSON.stringify(body.meta)),
      student: {
        connect: {
          id: student.id,
        },
      },
    },
  });

  return data;
}

export async function handleRequest(
  request: Request,
  data: any,
  studentId: string
) {
  const session = await auth.api.getSession(request);
  const id = session!.user.id;
  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
      registeredBy: {
        id,
      },
    },
    include: {
      report: true,
    },
  });

  if (!student) {
    throw new Error("Student not found");
  }

  const prompt = getPropmt(
    data.type as any,
    student.report[0].textContent,
    data.meta,
    data.meta
  );

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `
        ----
        metadados do conteúdo que deve ser gerado:
        ${JSON.stringify(data.meta)}
        ---
        ${prompt}
        `,
      },
    ],
    temperature: 0.3,
    model: "gpt-4o-mini",
  });

  const answer = response.choices[0].message.content;

  await prisma.requests.update({
    where: {
      id: data.id,
    },
    data: {
      content: answer,
      status: "SUCCESS",
    },
  });
}
