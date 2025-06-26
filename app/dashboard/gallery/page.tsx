"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GalleryDto } from "@/dtos/gallery.dto";
import { getAllImages } from "@/lib/api-client/gallery";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddImage from "./feature/AddImage";

export default function ImageManagement() {
  const [images, setImages] = useState<GalleryDto[]>([]);
  const [label, setLabel] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleDeleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImageList = (image: GalleryDto) => {
    setImages([image, ...images]);
  };

  useEffect(() => {
    const nestedEffect = async () => {
      const response = await getAllImages();
      setImages(response.data);
      console.log(response);
    };
    nestedEffect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Image Management</h1>
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
                            onClick={() => handleDeleteImage(image.key)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
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
  );
}
