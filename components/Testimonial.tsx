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
      className="py-8 md:py-12 lg:py-24 xl:py-32 bg-gradient-to-br from-gray-50 to-primary-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              Testimonials
            </div>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl/tight">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-sm text-muted-foreground sm:text-base md:text-lg/relaxed lg:text-base/relaxed xl:text-xl/relaxed px-4">
              Don&apos;t just take our word for it. Here&apos;s what our customers have to
              say about our services.
            </p>
          </div>
        </div>
        
        <div className="mt-8 md:mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full mx-auto"
          >
            {/* Hide navigation arrows on mobile for cleaner look */}
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
            
            <CarouselContent className="py-4 -ml-2 sm:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-2 sm:pl-4 basis-[85%] sm:basis-[75%] md:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex flex-col space-y-3 sm:space-y-4 rounded-xl bg-white p-4 sm:p-6 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow duration-300 h-full">
                    {/* Header */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="size-10 sm:size-12 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-base sm:text-lg font-bold text-primary-600">
                          {testimonial.user?.full_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">
                          {testimonial.user?.full_name}
                        </h3>
                        <div className="flex items-center text-muted-foreground text-xs sm:text-sm">
                          <MapPin className="mr-1 size-3 flex-shrink-0" />
                          <span className="truncate">{testimonial.user?.city}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-3 sm:size-4 ${
                              i < (testimonial.rating ?? 0)
                                ? "fill-accent-500 text-accent-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm flex-grow">
                      {testimonial.comment}
                    </p>

                    {/* Quote Icon */}
                    <div className="flex justify-end mt-auto">
                      <div className="size-6 sm:size-8 bg-primary-50 rounded-full flex items-center justify-center">
                        <span className="text-primary-500 text-sm sm:text-lg font-bold">
                          &quot;
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          
          {/* Mobile-friendly dots indicator (optional) */}
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex space-x-2">
              {testimonials.slice(0, 3).map((_, index) => (
                <div
                  key={index}
                  className="size-2 rounded-full bg-primary-300"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;