import { prisma } from "~/lib/prisma";

export async function getRequest(
  id: string,

  request: Request
) {
  const report = await prisma.requests.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    throw new Error("Report not found");
  }

  return report;
}
