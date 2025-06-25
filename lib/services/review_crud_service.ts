import { ClientError } from "@/errors/error";
import { prisma } from "@/uitls/db";

export const getreviewLink = async (userId: number) => {
  if (!userId) throw ClientError.invalidError();

  const isUserExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!isUserExist) throw ClientError.notExistsError("User");

  //create blank row
  const review = await prisma.review.create({
    data: {
      phone_number: String(isUserExist.phone_number),
    },
  });
  const link = `${process.env.REVIEW_LINK_BASE_URL}review/${review.uuid}`;

  return link;
};
