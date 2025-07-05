import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ReviewDto } from "@/dtos/review.dto";
import { MapPin, Star } from "lucide-react";

const Testimonials = ({ testimonials }: { testimonials: ReviewDto[] }) => {
  return (
    <section
      id="testimonials"
      className="py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-primary-50"
    >
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
              Don&apos;t just take our word for it. Here&apos;s what our customers have to
              say about our services.
            </p>
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="max-2xl:w-[90%] w-full mx-auto"
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className="py-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="flex flex-col space-y-4 rounded-xl bg-white p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-center space-x-4">
                    <div className="size-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary-600">
                        {testimonial.user?.full_name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">
                        {testimonial.user?.full_name}
                      </h3>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="mr-1 size-3" />
                        <span>{testimonial.user?.city}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < (testimonial.rating ?? 0)
                              ? "fill-accent-500 text-accent-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {testimonial.comment}
                  </p>

                  {/* Quote Icon */}
                  <div className="flex justify-end">
                    <div className="size-8 bg-primary-50 rounded-full flex items-center justify-center">
                      <span className="text-primary-500 text-lg font-bold">
                        &quot;
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
