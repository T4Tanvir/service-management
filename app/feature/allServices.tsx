import { CheckCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface ServiceCardProps {
  service: any;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    // Single card container that keeps everything together
    <div
      className={`bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 ${
        isHovered ? "shadow-xl transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          layout="fill"
          objectFit="cover"
          className={`transition-transform duration-700 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white z-10">
          {service.title}
        </h3>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6">
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          {service.description}
        </p>
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((feature: string, idx: number) => (
            <li key={idx} className="flex items-start">
              <CheckCircle
                size={16}
                className="text-primary-600 mt-1 mr-2 flex-shrink-0"
              />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`/services/${service.title}`}
          className="text-primary-600 hover:underline"
        >
          <button className="flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group">
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
