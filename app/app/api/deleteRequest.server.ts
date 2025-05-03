import { prisma } from "~/lib/prisma";

export async function deleteRequest(id: string) {
  await prisma.requests.delete({
    where: {
      id,
    },
  });

  return {};
}
