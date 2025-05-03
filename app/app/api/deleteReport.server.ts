import { prisma } from "~/lib/prisma";

export async function deleteReport(id: string) {
  await prisma.report.delete({
    where: {
      id,
    },
  });

  return {};
}
