import { ReviewDto } from "@/dtos/review.dto";
import { ClientError } from "@/errors/error";
import { prisma } from "@/uitls/db";

const isVlaidationExpire = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
  return diffInDays > 3;
};

export const getreviewLink = async (userId: number) => {
  if (!userId) throw ClientError.invalidError();

  const isUserExist = await prisma.user.findUnique({ where: { id: userId } });
  if (!isUserExist) throw ClientError.notExistsError("User");

  const isUserPermitExist = await prisma.reviewPermission.findFirst({
    where: { phone_number: isUserExist.phone_number },
  });

  if (isUserPermitExist) {
    if (!isVlaidationExpire(isUserPermitExist.created_at)) {
      return `${process.env.REVIEW_LINK_BASE_URL}review/${isUserPermitExist.uuid}`;
    }
  }
  //create blank row
  const review = await prisma.reviewPermission.create({
    data: {
      phone_number: String(isUserExist.phone_number),
    },
  });
  const link = `${process.env.REVIEW_LINK_BASE_URL}review/${review.uuid}`;

  return link;
};

export const validateAndGetReviewLink = async (uuid: string) => {
  if (!uuid) throw ClientError.invalidError();

  const isExist = await prisma.reviewPermission.findUnique({ where: { uuid } });
  if (!isExist) {
    return {
      success: false,
    };
  }

  if (isVlaidationExpire(isExist.created_at)) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: isExist,
  };
};

export const create = async (data: ReviewDto) => {
  if (!data.phone_number)
    throw ClientError.invalidError("Phone number is required");
  if (!data.rating) throw ClientError.invalidError("Rating is required");
  if (!data.comment) throw ClientError.invalidError("Comment is required");
  if (!data.review_permit_uuid) throw ClientError.invalidError();

  const isExistreviewPermission = await prisma.reviewPermission.findUnique({
    where: { uuid: data.review_permit_uuid },
  });
  if (!isExistreviewPermission) throw ClientError.invalidError();

  if (isVlaidationExpire(isExistreviewPermission.created_at)) {
    throw ClientError.invalidError("Review permission has expired");
  }

  if (isExistreviewPermission.phone_number !== data.phone_number) {
    throw ClientError.invalidError(
      "Phone number does not match the service receiving number"
    );
  }

  const insertedData = await prisma.review.create({
    data: {
      phone_number: data.phone_number,
      service_id: data.service_id || null,
      rating: data.rating,
      comment: data.comment,
    },
  });

  return insertedData;
};

export const getAll = async () => {
  const reviews = await prisma.review.findMany({
    include: {
      user: {
        select: {
          full_name: true,
          phone_number: true,
        },
      },
      service: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });
  return reviews;
};

export const deleteReview = async (reviewId: number) => {
  if (!reviewId) throw ClientError.invalidError("Review ID is required");

  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
  });
  if (!existingReview) throw ClientError.notExistsError("Review");

  await prisma.review.delete({ where: { id: reviewId } });

  return { success: true, message: "Review deleted successfully" };
};

export const getTopReview = async (
  numberOfreview = 10
): Promise<ReviewDto[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      rating: {
        gt: 4,
      },
    },
    take: numberOfreview,
    include: {
      user: {
        select: {
          full_name: true,
          city: true,
        },
      },
    },
  });
  return reviews.map((item) => new ReviewDto(item));
};

export const getTopReviewByServiceId = async (
  serviceId: number,
  numberOfreview = 10
): Promise<ReviewDto[]> => {
  const reviews = await prisma.review.findMany({
    where: {
      service_id: serviceId,
      rating: {
        gt: 2,
      },
    },
    take: numberOfreview,
    include: {
      user: {
        select: {
          full_name: true,
          city: true,
        },
      },
    },
  });
  return reviews.map((item) => new ReviewDto(item));
};
