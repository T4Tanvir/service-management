import ServiceBooking from "@/components/service-booking/ServicingBook";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";
import { ServiceDto } from "@/dtos/service.dto";
import { NestedService } from "@/type/service.type";
type HeroProps = {
  service: ServiceDto;
  nestedServices: NestedService[];
};
const Hero: React.FC<HeroProps> = ({ service, nestedServices }) => {
  return (
    <section
      style={{ minHeight: `calc(100vh - 5rem)` }}
      className="relative flex items-center pt-16"
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${service.image_url})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            {service.name}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
            {service.short_description}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
            Licensed professionals providing top-quality solutions. Available
            24/7 for emergencies.
          </p>
          <div className="mb-10 p-4 bg-yellow-400/20 border border-yellow-400 rounded-lg">
            <p className="text-lg font-semibold text-white text-center">
              Now We proudly serve all areas of ShelaNogor
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ServiceBooking nestedService={nestedServices} />
            <Link href="/#services">
              <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-primary-900 border border-yellow-300 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300">
                Get Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
