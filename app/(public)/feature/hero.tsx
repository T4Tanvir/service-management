import ServiceBooking from "@/components/service-booking/ServicingBook";
import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

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
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-700/50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
            Peace Home Empire
            <br />
            <span className="text-yellow-400">Trusted Home Solutions</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 max-w-3xl">
            At Peace Home Empire, our licensed professionals deliver exceptional
            residential and commercial services across Dhaka, available 24/7 for
            your peace of mind.
          </p>
          <div className="mb-10 p-4 bg-yellow-400/20 border border-yellow-400 rounded-lg">
            <p className="text-lg font-semibold text-white text-center">
              Now We proudly serve all areas of ShelaNogor
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <ServiceBooking />
            <Link href="/#services">
              <Button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-primary-900 border border-yellow-300 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300">
                Explore Our Services
              </Button>
            </Link>
          </div>
          <div className="mt-14">
            <p className="text-white font-semibold text-lg text-center sm:text-left italic max-w-2xl">
              "Peace Home Empire transformed our home with their reliable and
              professional service!"
              <span className="block mt-2 text-yellow-400 text-base">
                — Satisfied Client, Dhaka
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
