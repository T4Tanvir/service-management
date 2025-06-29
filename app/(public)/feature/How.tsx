import { Clock, MapPin, ThumbsUp } from "lucide-react";
import React from "react";

const How: React.FC = () => {
  return (
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
              title: "Book a Service",
              description:
                "Select from our wide range of home services and place your order.",
              icon: <MapPin className="h-10 w-10 text-primary-600" />,
              step: "01",
            },
            {
              title: "Confirmation Call",
              description:
                "We'll call to confirm your requirements and ensure a perfect match.",
              icon: <Clock className="h-10 w-10 text-primary-600" />,
              step: "02",
            },
            {
              title: "Service Completion",
              description:
                "Our professional will arrive on time and complete the service to your satisfaction.",
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
              <div className="rounded-full text-center bg-primary-100 px-3 py-1 text-sm font-medium text-primary-600">
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
  );
};

export default How;
