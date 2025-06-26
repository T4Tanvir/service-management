import BookNow from "@/components/BookNow";
import Footer from "@/components/footer";
import Testimonial from "@/components/Testimonial";
import { serviceList } from "@/data/services";
import { Clock, MapPin, ThumbsUp } from "lucide-react";
import ServiceCard from "../(public)/feature/allServices";
import Hero from "../(public)/feature/hero";
import Navbar from "@/components/navbar";

interface ParamsType {
  id: string;
}
const ServiceDetail = ({ params }: { params: ParamsType }) => {
  const service = serviceList.find((s) => s.id === params.id);
  return (
    <>
      <Navbar scrolled={false} />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

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
              {serviceList.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-12 md:py-24 lg:py-32 bg-primary-50"
        >
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Book a Service in 3 Simple Steps
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We've made booking home services as easy as possible.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              {[
                {
                  title: "Select a Service",
                  description: "Choose from our wide range of home services.",
                  icon: <MapPin className="h-10 w-10 text-primary-600" />,
                  step: "01",
                },
                {
                  title: "Book an Appointment",
                  description: "Select your preferred date and time slot.",
                  icon: <Clock className="h-10 w-10 text-primary-600" />,
                  step: "02",
                },
                {
                  title: "Get the Service Done",
                  description:
                    "Our professional will arrive and complete the service.",
                  icon: <ThumbsUp className="h-10 w-10 text-primary-600" />,
                  step: "03",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 rounded-lg p-6"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                    {step.icon}
                  </div>
                  <div className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-600">
                    Step {step.step}
                  </div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-center text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonial />

        <BookNow />
      </main>
      <Footer />
    </>
  );
};

export default ServiceDetail;
