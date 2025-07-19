import { FeatureDto } from "@/dtos/feature.dto";
import { ClientError } from "@/errors/error";
import { ServiceFeature } from "@/generated/prisma";
import { IFeature } from "@/type/feature.type";
import { prisma } from "@/uitls/db";

export const create = async (data: FeatureDto): Promise<IFeature> => {
  const isServiceExists = await prisma.service.findUnique({
    where: { id: data.service_id },
    select: {
      id: true,
      name: true,
    },
  });

  if (!isServiceExists) {
    throw ClientError.invalidError("Service does not exist");
  }

  const insertedFeature = await prisma.serviceFeature.create({
    data: {
      service_id: data.service_id,
      feature_text: data.feature_text,
    },
  });

  return {
    ...insertedFeature,
    service: {
      id: isServiceExists?.id,
      name: isServiceExists?.name,
    },
  };
};

export const getAll = async (): Promise<IFeature[]> => {
  const features = await prisma.serviceFeature.findMany({
    include: {
      service: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      service_id: "asc",
    },
  });

  return features;
};

export const edit = async (id: number, data: FeatureDto): Promise<IFeature> => {
  const isFeatureExists = await prisma.serviceFeature.findUnique({
    where: { id },
  });

  if (!isFeatureExists) {
    throw ClientError.invalidError("Feature does not exist");
  }

  const isServiceExists = await prisma.service.findUnique({
    where: { id: data.service_id },
    select: {
      id: true,
      name: true,
    },
  });

  if (!isServiceExists) {
    throw ClientError.invalidError("Service does not exist");
  }

  const updatedFeature = await prisma.serviceFeature.update({
    where: { id: id },
    data: {
      service_id: data.service_id,
      feature_text: data?.feature_text ?? "",
    },
  });

  return {
    ...updatedFeature,
    service: {
      id: isServiceExists?.id,
      name: isServiceExists?.name,
    },
  };
};

export const deleteFeature = async (id: number): Promise<ServiceFeature> => {
  const isFeatureExists = prisma.serviceFeature.findUnique({
    where: { id },
  });

  if (!isFeatureExists) {
    throw ClientError.invalidError("Feature does not exist");
  }
  return prisma.serviceFeature.delete({
    where: { id },
  });
};

export const getFeatureListByServiceId = async (
  serviceId: number
): Promise<FeatureDto[]> => {
  const featureList = await prisma.serviceFeature.findMany({
    where: { service_id: serviceId },
  });

  return featureList.map((feature) => new FeatureDto(feature));
};
