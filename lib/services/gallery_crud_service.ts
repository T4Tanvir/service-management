import { GalleryDto } from "@/dtos/gallery.dto";
import { ClientError } from "@/errors/error";
import { prisma } from "@/uitls/db";

export const getAll = async (): Promise<GalleryDto[]> => {
  const response = await prisma.gallery.findMany();
  return response.map((image) => new GalleryDto(image));
};

export const create = async (data: GalleryDto) => {
  if (!data.key || !data.label || !data.url) throw ClientError.invalidError();
  console.log(data);

  const insertedData = await prisma.gallery.create({
    data: {
      label: data.label,
      url: data.url,
      key: data.key,
    },
  });

  return insertedData;
};
