import { ServiceDto } from "@/dtos/service.dto";
import { prisma } from "@/uitls/db";

import { ServiceDetailDto } from "@/dtos/service_detail.dto";
import { ClientError } from "@/errors/error";
import { Service } from "@/generated/prisma";
import { NestedService } from "@/type/service.type";
import * as detailService from "./detail_service_crud_service";

// // Initialize Prisma Client
// const prisma = new PrismaClient();

// Type for filtering parameters
type FilterParams = {
  name?: string;
  parentId?: number | null;
};

interface ServiceWithChildren extends ServiceDto {
  children: ServiceDto[];
}

/**
 * Create a new service
 */
export const create = async (data: ServiceDto): Promise<ServiceDto> => {
  const { details, ...rest } = data;

  const dataNeedToInsert = {
    parent_id: rest?.parent_id ?? null,
    name: rest.name.trim(),
    active: true,
    image_url: rest.image_url,
    short_description: rest.short_description,
    created_at: rest.created_at,
  };
  const insertedService: Service = await prisma.service.create({
    data: dataNeedToInsert,
  });

  const insertedDetail = await detailService.create(
    new ServiceDetailDto({ ...details, service_id: insertedService.id })
  );

  return new ServiceDto({
    ...insertedService,
    details: new ServiceDetailDto(insertedDetail),
    faqs: [],
  });
};

/**
 * Get a service by ID
 */
export const getAllRootServices = async (): Promise<Service[]> =>
  await prisma.service.findMany({
    where: { parent_id: null },
    include: {
      parent: true,
      children: true,
      details: true,
      faqs: true,
      reviews: true,
    },
  });

export const getChildServiceByParentIdId = async (
  id: number | null
): Promise<Service[]> =>
  await prisma.service.findMany({
    where: { parent_id: id },
    include: {
      parent: true,
      children: true,
      details: true,
      faqs: true,
      reviews: true,
    },
  });

function flattenServicesForDisplay(
  services: ServiceWithChildren[],
  parentPath = ""
) {
  const flattened: ServiceDto[] = [];

  services.forEach((service) => {
    // Build the path
    const currentPath = parentPath
      ? `${parentPath} > ${service.name}`
      : service.name;

    flattened.push(new ServiceDto({ ...service, path: currentPath }));

    // Recursively add children
    if (service.children && service.children.length > 0) {
      flattened.push(
        ...flattenServicesForDisplay(
          service.children as ServiceWithChildren[],
          currentPath
        )
      );
    }
  });

  return flattened;
}
/**
 * Get all services with optional filtering
 */
export const getAllServices = async (
  params?: FilterParams
): Promise<ServiceDto[]> => {
  const where: any = {};

  if (params?.name) {
    where.name = {
      contains: params.name,
      mode: "insensitive",
    };
  }

  if (params?.parentId === null) {
    where.parent_id = null;
  } else if (params?.parentId) {
    where.parent_id = params.parentId;
  }

  const serviceDetails = await prisma.service.findMany({
    where,
    include: {
      parent: true,
      children: true,
      details: true,
    },
    orderBy: { id: "asc" },
  });

  const updatedServiceDetail = serviceDetails.map(
    (service) =>
      new ServiceDto({
        ...service,
        details: new ServiceDetailDto(service.details[0] || {}),
      })
  );

  const serviceMap = new Map();
  const rootServices: ServiceWithChildren[] = [];
  updatedServiceDetail.forEach((service) => {
    serviceMap.set(service.id, { ...service, children: [] });
  });

  // Then, build the tree structure
  updatedServiceDetail.forEach((service) => {
    if (service.parent_id) {
      const parent = serviceMap.get(service.parent_id);
      if (parent) {
        parent.children.push(serviceMap.get(service.id));
      }
    } else {
      rootServices.push(serviceMap.get(service.id));
    }
  });

  const flatData = flattenServicesForDisplay(rootServices);

  return flatData;
};

/**
 * Get all services with optional filtering
 */
export const getAllServicesBasicInfo = async (
  params?: FilterParams
): Promise<Service[]> => {
  const where: any = {};

  if (params?.name) {
    where.name = {
      contains: params.name,
      mode: "insensitive",
    };
  }

  if (params?.parentId === null) {
    where.parent_id = null;
  } else if (params?.parentId) {
    where.parent_id = params.parentId;
  }

  return prisma.service.findMany({
    where,
    include: {
      parent: true,
      children: true,
    },
  });
};

/**
 * Get services organized in a tree structure
 */
export const getServiceTree = async (): Promise<Service[]> =>
  prisma.service.findMany({
    where: {
      parentId: null,
    },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
  });

/**
 * Update a service
 */
export const updateService = async (
  id: number,
  data: ServiceDto
): Promise<ServiceDto> => {
  return await prisma.$transaction(async (tx) => {
    // Service existence check
    const serviceInfo = await tx.service.findFirst({
      where: { id },
    });

    if (!serviceInfo) {
      throw ClientError.notExistsError();
    }

    // Update service
    const updatedService = await tx.service.update({
      where: { id },
      data: {
        name: data.name,
        parent_id: data.parent_id ?? null,
        image_url: data.image_url,
        short_description: data.short_description,
      },
    });

    let serviceDetail = null;

    // Handle service details
    if (data.details) {
      const existingDetail = await tx.serviceDetail.findFirst({
        where: { service_id: id },
      });

      if (existingDetail) {
        serviceDetail = await tx.serviceDetail.update({
          where: { id: existingDetail.id },
          data: {
            long_description: data.details.long_description,
            short_description: data.details.short_description,
          },
        });
      } else {
        serviceDetail = await tx.serviceDetail.create({
          data: {
            service_id: id,
            price: data.details.price ?? 0, // Default price if not provided
            long_description: data.details.long_description,
            short_description: data.details.short_description,
          },
        });
      }
    }

    // Build response
    const response = new ServiceDto({
      ...serviceInfo,
      ...updatedService,
      details: serviceDetail ? new ServiceDetailDto(serviceDetail) : undefined,
    });

    return response;
  });
};
/**
 * Delete a service
 */
export const deleteService = async (id: number): Promise<ServiceDto> => {
  const isServiceExist = await prisma.service.findUnique({
    where: { id },
    select: { id: true },
  });
  if (!isServiceExist) throw ClientError.notExistsError("Service not found");

  const isChildExist = await prisma.service.findFirst({
    where: { parent_id: id },
    select: { id: true },
  });

  if (isChildExist) {
    throw ClientError.invalidError(
      "Cannot delete service with existing children"
    );
  }

  const deletedServiceDetail = await prisma.serviceDetail.deleteMany({
    where: { service_id: id },
  });

  const deletedService = await prisma.service.delete({
    where: { id },
  });

  return new ServiceDto({ ...deletedService, details: deletedServiceDetail });
};

function buildNestedStructure(services: Partial<Service>[]) {
  // Create a map for quick lookup
  const serviceMap = new Map();
  const rootServices: NestedService[] = [];

  // First pass: Create map of all services
  services.forEach((service) => {
    serviceMap.set(service.id, {
      id: service.id,
      name: service.name,
      parent_id: service.parent_id,
      image_url: service?.image_url ?? "",
      subcategory: [],
    });
  });

  // Second pass: Build the hierarchy
  services.forEach((service) => {
    const currentService = serviceMap.get(service.id);

    if (service.parent_id === null) {
      // Root level service
      rootServices.push(currentService);
    } else {
      // Child service - add to parent's subcategory
      const parentService = serviceMap.get(service.parent_id);
      if (parentService) {
        parentService.subcategory.push(currentService);
      }
    }
  });

  return rootServices;
}

export async function getNestedServices(): Promise<NestedService[]> {
  try {
    // Step 1: Fetch all services from database
    const allServices = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        parent_id: true,
      },
      orderBy: [
        { parent_id: "asc" }, // Root services first
        { id: "asc" },
      ],
    });

    console.log("Total services fetched:", allServices.length);

    // Step 2: Build nested structure using JavaScript
    const nestedServices = buildNestedStructure(allServices);

    return nestedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
}

// New method: Find service by ID and return with subcategories
function getServiceWithSubcategories(
  services: Partial<Service>[],
  serviceId: number
): NestedService | null {
  // Build the complete nested structure first
  const nestedStructure = buildNestedStructure(services);

  // Helper function to search recursively
  function findServiceInTree(
    serviceTree: NestedService[],
    targetId: string | number
  ): NestedService | null {
    for (const service of serviceTree) {
      if (service.id === targetId) {
        return service;
      }

      // Search in subcategories
      const found = findServiceInTree(service.subcategory, targetId);
      if (found) {
        return found;
      }
    }
    return null;
  }

  return findServiceInTree(nestedStructure, serviceId);
}

export const getServiceDetailByName = async (
  name: string
): Promise<NestedService[]> => {
  const allServices = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      parent_id: true,
      image_url: true,
    },
    orderBy: [
      { parent_id: "asc" }, // Root services first
      { id: "asc" },
    ],
  });
  const serviceInfo = allServices.find((item) => item.name === name);

  if (!serviceInfo) {
    return [];
  }

  const result = getServiceWithSubcategories(allServices, serviceInfo.id);
  return result ? [result] : [];
};
