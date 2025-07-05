import { FaqDto } from "@/dtos/faq.dto";
import { ClientError } from "@/errors/error";
import { Faq } from "@/generated/prisma";
import { IFaq } from "@/type/faq.type";
import { prisma } from "@/uitls/db";

export const create = async (data: FaqDto): Promise<IFaq> => {
  let isServiceExist;
  if (data.service_id) {
    isServiceExist = await prisma.service.findUnique({
      where: { id: data.service_id },
      select: {
        id: true,
        name: true,
      },
    });

    if (!isServiceExist) {
      throw ClientError.invalidError("Service does not exist");
    }
  }

  const insertedFaq = await prisma.faq.create({
    data: {
      service_id: data.service_id,
      question: data.question,
      answer: data.answer,
    },
  });

  return {
    ...insertedFaq,
    service: {
      id: isServiceExist?.id || 0,
      name: isServiceExist?.name || "",
    },
  };
};

export const getAll = async (): Promise<FaqDto[]> => {
  const faqs = await prisma.faq.findMany({
    include: {
      service: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      service_id: "desc",
    },
  });

  return faqs.map((item) => new FaqDto(item));
};

export const edit = async (id: number, data: FaqDto): Promise<IFaq> => {
  const isFaqExists = await prisma.faq.findUnique({
    where: { id },
  });

  if (!isFaqExists) {
    throw ClientError.invalidError("Faq does not exist");
  }

  let isServiceExist;
  if (data.service_id) {
    isServiceExist = await prisma.service.findUnique({
      where: { id: data.service_id! },
      select: {
        id: true,
        name: true,
      },
    });

    if (!isServiceExist) {
      throw ClientError.invalidError("Service does not exist");
    }
  }

  const updatedFaq = await prisma.faq.update({
    where: { id: id },
    data: {
      service_id: data.service_id,
      question: data.question,
      answer: data.answer,
    },
  });

  return {
    ...updatedFaq,
    service: {
      id: isServiceExist?.id || 0,
      name: isServiceExist?.name || "",
    },
  };
};

export const deleteFaq = async (id: number): Promise<Faq> => {
  const isFaqExists = await prisma.faq.findUnique({
    where: { id },
  });

  if (!isFaqExists) {
    throw ClientError.invalidError("Faq does not exist");
  }

  return await prisma.faq.delete({
    where: { id },
  });
};

export const getFaqByServiceId = async (
  serviceId: number | null
): Promise<FaqDto[]> => {
  const faqs = await prisma.faq.findMany({
    where: { service_id: serviceId },
  });

  return faqs.map((item) => new FaqDto(item));
};
