import { MapPin, Star } from "lucide-react";

const Testimonial = () => {
  return (
    <section id="testimonials" className="py-12 md:py-24 lg:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Don't just take our word for it. Here's what our customers have to
              say about our services.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Rahima Ahmed",
              location: "Dhaka",
              testimonial:
                "The AC repair service was excellent. The technician was professional and fixed the issue quickly.",
              rating: 5,
            },
            {
              name: "Karim Hassan",
              location: "Chittagong",
              testimonial:
                "I've used their plumbing services twice now. Always on time and very professional work.",
              rating: 5,
            },
            {
              name: "Fatima Khan",
              location: "Sylhet",
              testimonial:
                "The house cleaning team did an amazing job. My home has never looked better!",
              rating: 4,
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 rounded-lg border p-6 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="space-y-1">
                  <h3 className="font-bold">{testimonial.name}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-1 h-3 w-3" />
                    <span className="text-xs">{testimonial.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent-500 text-accent-500"
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
