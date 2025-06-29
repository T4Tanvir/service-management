import { ServiceDto } from "@/dtos/service.dto";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ServiceCardProps {
  service: ServiceDto;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 group hover:shadow-xl hover:-translate-y-1"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Image Section */}
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={service.image_url}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white z-10">
          {service.name}
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          {service.short_description}
        </p>

        {/* Learn More Button */}
        <Link
          href={`/services/${service.name.split(" ").join("-")}`}
          className="text-primary-600 hover:underline inline-block"
        >
          <button className="flex cursor-pointer items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group">
            Learn More
            <ChevronRight
              size={16}
              className="ml-1 group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
