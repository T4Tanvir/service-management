"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryDto } from "@/dtos/gallery.dto";
import { deleteImage, getAllImages } from "@/lib/api-client/gallery";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddImage from "./feature/AddImage";
import { toast } from "react-toastify";
import { DeleteConfirmDialog } from "@/components/ui/confirmationDialog";

export default function ImageManagement() {
  const [images, setImages] = useState<GalleryDto[]>([]);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteImage = async () => {
    setIsLoading(true);
    try {
      if (!selectedImageId) return;
      await deleteImage(selectedImageId);
      setSelectedImageId(null);
      toast.success("Image deleted successfully");
      setImages((prev) => prev.filter((img) => img.id !== selectedImageId));
    } catch (error) {
      toast.error("Failed to delete image");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateImageList = (image: GalleryDto) => {
    setImages([image, ...images]);
  };

  useEffect(() => {
    const nestedEffect = async () => {
      const response = await getAllImages();
      setImages(response.data);
    };
    nestedEffect();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
              Image Management
            </h1>
            <p className="text-gray-600">Upload and manage your images</p>
          </div>

          <AddImage onUpdateImageList={updateImageList} />
          {/* Images List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">
                Uploaded Images ({images.length})
              </h2>
            </div>

            {images.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="space-y-3">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="text-lg font-medium text-gray-900">
                      No images uploaded
                    </h3>
                    <p className="text-gray-500">
                      Upload your first image to get started
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {images.map((image) => (
                  <Card
                    key={image.key}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="relative aspect-square overflow-hidden rounded-lg">
                          <Image
                            src={image.url || "/placeholder.svg"}
                            alt={image.label}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>

                        <div className="space-y-2">
                          <h3
                            className="font-medium text-gray-900 truncate"
                            title={image.label}
                          >
                            {image.label}
                          </h3>
                          <div className="flex items-center justify-between">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setSelectedImageId(image.id)}
                              className="opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <DeleteConfirmDialog
        open={!!selectedImageId}
        onOpenChange={(open) => !open && setSelectedImageId(null)}
        onConfirm={() => selectedImageId && handleDeleteImage()}
        title="Delete Feature"
        description="Are you sure you want to delete this Image? This action cannot be undone."
        isLoading={isLoading}
      />
    </>
  );
}
