"use client";
import { GalleryDto } from "@/dtos/gallery.dto";
import { getAllImages } from "@/lib/api-client/gallery";
import { ChevronLeft, ChevronRight, Grid3x3, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [images, setImages] = useState<GalleryDto[]>([]);

  const openModal = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    } else {
      newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(images[newIndex].id);
  };

  const selectedImageData = images.find((img) => img.id === selectedImage);

  useEffect(() => {
    const nestedEffect = async () => {
      const images = await getAllImages();
      setImages(images.data);
    };
    nestedEffect();
  }, []);

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-slate-50 to-slate-100 ">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Title */}
        <div className="text-center mb-16 mt-10">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Grid3x3 className="w-6 h-6 text-amber-500" />
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Service Management
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Gallery of Our Services
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Explore a curated collection of images showcasing our service
            offerings, project highlights, and the quality we deliver to our
            clients.
          </p>
        </div>

        {/* Image Gallery - All Same Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.key}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer"
              onClick={() => openModal(image.id)}
            >
              <div className="aspect-square relative">
                <Image
                  src={image.url}
                  alt={image.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-2xl"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {image.label}
                    </h3>
                    <small className="text-warning-500 font-mono text-lg">
                      {image?.created_at
                        ? new Date(image.created_at)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })
                            .replace(/(\d+) (\w+) (\d+)/, "$1/$2/$3")
                        : ""}
                    </small>
                  </div>
                </div>
                {/* Corner Accent */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-amber-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center space-x-2 text-slate-600 font-medium">
            <span>Explore more of our work</span>
            <div className="w-8 h-px bg-gradient-to-r from-amber-400 to-orange-500"></div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-[95vw] sm:max-w-3xl md:max-w-5xl lg:max-w-7xl max-h-[90vh] mx-2 sm:mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative">
              <Image
                src={selectedImageData.url.replace("w=800", "w=1600")}
                alt={selectedImageData.label}
                width={1600}
                height={1200}
                className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                style={{ height: "auto" }}
                priority
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 lg:p-8 rounded-b-lg">
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  {/* Label Section */}
                  <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-bold leading-tight drop-shadow-lg">
                    {selectedImageData.label}
                  </h3>

                  {/* Date Section */}
                  <small className="text-warning-500 font-mono text-sm sm:text-base md:text-xl font-bold">
                    {selectedImageData?.created_at
                      ? new Date(selectedImageData.created_at)
                          .toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                          .replace(/(\d+) (\w+) (\d+)/, "$1/$2/$3")
                      : ""}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div className="absolute inset-0 -z-10" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
