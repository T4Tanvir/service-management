import { ServiceDetailDto } from "@/dtos/service_detail.dto";
import { ClientError } from "@/errors/error";
import { prisma } from "@/uitls/db";
import { ServiceDetail } from "@prisma/client";

export const create = async (
  data: ServiceDetailDto
): Promise<ServiceDetail> => {
  if (!data.service_id) throw ClientError.invalidError();

  const dataNeedToInsert: Omit<ServiceDetail, "id"> = {
    service_id: data.service_id,
    price: data.price,
    short_description: data?.short_description,
    long_description: data?.long_description,
  };

  return prisma.serviceDetail.create({ data: dataNeedToInsert });
};
