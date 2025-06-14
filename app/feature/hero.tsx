import ServiceBooking from "@/components/service-booking/ServicingBook";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      className="relative min-h-screen flex items-center pt-16"
      id="home"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1669754/pexels-photo-1669754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-700/40" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Professional Home Services You Can Trust
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Licensed professionals providing top-quality solutions for
            residential and commercial properties. Available 24/7 for
            emergencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <ServiceBooking />
            <Button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3 rounded-md font-medium text-lg transition-all duration-300">
              Our Services
            </Button>
          </div>
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    alt="Customer"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-white font-medium text-center sm:text-left">
                Trusted by 1000+ customers
              </p>
              <div className="flex justify-center sm:justify-start text-yellow-400 mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
