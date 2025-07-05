import { ServiceDto } from "@/dtos/service.dto";

import ServiceCard from "./component/ServiceCard";

const AllServices = async ({ services }: { services: ServiceDto[] }) => {
  return (
    <section id="services" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              Our Services
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Professional Services for Every Need
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From emergency repairs to regular maintenance, our verified
              professionals have got you covered.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={new ServiceDto(service)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllServices;
