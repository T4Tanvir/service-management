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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">
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
          <div className="relative max-w-7xl max-h-[90vh] mx-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <div className="relative">
              {/* Use Next.js Image for optimized loading */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image
                src={selectedImageData.url.replace("w=800", "w=1600")}
                alt={selectedImageData.label}
                width={1600}
                height={1200}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                style={{ width: "100%", height: "auto", maxHeight: "90vh" }}
                priority
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {selectedImageData.label}
                </h3>
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
