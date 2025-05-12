import { prisma } from "~/lib/prisma";

export async function updateRequest(id: string, content: string) {
  const report = await prisma.requests.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    throw new Error("Report not found");
  }
  if (report?.content === content) {
    return;
  }

  const updatedReport = await prisma.requests.update({
    where: {
      id,
    },
    data: {
      content,
    },
  });

  return updatedReport;
}
