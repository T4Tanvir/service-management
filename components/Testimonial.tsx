"use client";

import { ReviewDto } from "@/dtos/review.dto";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonial({
  testimonials,
}: {
  testimonials: ReviewDto[];
}) {
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
              Don't just take our word for it. Here's what our customers have to
              say about our services.
            </p>
          </div>
        </div>

        {/* CSS-Only Carousel Container */}
        <div className="relative mx-auto max-w-6xl py-12">
          <div className="testimonial-carousel">
            {/* Radio buttons for navigation (hidden) */}
            <input
              type="radio"
              name="testimonial-slide"
              id="slide-1"
              className="sr-only"
              defaultChecked
            />
            <input
              type="radio"
              name="testimonial-slide"
              id="slide-2"
              className="sr-only"
            />
            <input
              type="radio"
              name="testimonial-slide"
              id="slide-3"
              className="sr-only"
            />

            {/* Carousel Content */}
            <div className="carousel-content overflow-hidden">
              <div className="carousel-track flex transition-transform duration-500 ease-in-out">
                {/* Slide 1 */}
                <div className="carousel-slide w-full flex-shrink-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
                    {(testimonials?.slice(0, 3) ?? []).map(
                      (testimonial, index) => (
                        <TestimonialCard
                          key={index}
                          testimonial={testimonial}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* Slide 2 */}
                <div className="carousel-slide w-full flex-shrink-0">
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
                    {(testimonials ?? [])
                      .slice(3, 6)
                      .map((testimonial, index) => (
                        <TestimonialCard
                          key={index + 3}
                          testimonial={testimonial}
                        />
                      ))}
                  </div>
                </div>

                {/* Slide 3 - Mobile only (single testimonials) */}
                <div className="carousel-slide w-full flex-shrink-0 lg:hidden">
                  <div className="grid gap-6 px-4">
                    {testimonials && testimonials.length > 0 && (
                      <TestimonialCard testimonial={testimonials[0]} />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Labels (styled as buttons) */}
            <label
              htmlFor="slide-1"
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 cursor-pointer"
            >
              <div className="bg-white shadow-lg border border-primary-200 hover:bg-primary-50 rounded-full p-2 transition-colors">
                <ChevronLeft className="size-4" />
              </div>
            </label>

            <label
              htmlFor="slide-2"
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 cursor-pointer"
            >
              <div className="bg-white shadow-lg border border-primary-200 hover:bg-primary-50 rounded-full p-2 transition-colors">
                <ChevronRight className="size-4" />
              </div>
            </label>

            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              <label htmlFor="slide-1" className="cursor-pointer">
                <div className="size-3 rounded-full bg-primary-200 hover:bg-primary-300 transition-all duration-300 dot-indicator" />
              </label>
              <label htmlFor="slide-2" className="cursor-pointer">
                <div className="size-3 rounded-full bg-primary-200 hover:bg-primary-300 transition-all duration-300 dot-indicator" />
              </label>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .testimonial-carousel {
          position: relative;
        }

        /* Hide radio buttons */
        .testimonial-carousel input[type="radio"] {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        /* Carousel track positioning */
        .carousel-track {
          transform: translateX(0%);
        }

        /* Slide transitions */
        #slide-1:checked ~ .carousel-content .carousel-track {
          transform: translateX(0%);
        }

        #slide-2:checked ~ .carousel-content .carousel-track {
          transform: translateX(-100%);
        }

        #slide-3:checked ~ .carousel-content .carousel-track {
          transform: translateX(-200%);
        }

        /* Dot indicators active state */
        #slide-1:checked ~ .flex .dot-indicator:nth-child(1) div,
        label:nth-child(1):has(#slide-1:checked) .dot-indicator {
          background-color: rgb(30 58 138);
          transform: scale(1.1);
        }

        #slide-2:checked ~ .flex .dot-indicator:nth-child(2) div,
        label:nth-child(2):has(#slide-2:checked) .dot-indicator {
          background-color: rgb(30 58 138);
          transform: scale(1.1);
        }

        /* Auto-play animation (optional) */
        @keyframes auto-slide {
          0%,
          33% {
            transform: translateX(0%);
          }
          34%,
          66% {
            transform: translateX(-100%);
          }
          67%,
          100% {
            transform: translateX(-200%);
          }
        }

        /* Uncomment to enable auto-play */
        /*
        .carousel-track {
          animation: auto-slide 12s infinite;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }
        */

        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
          .carousel-slide .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .carousel-slide .grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: ReviewDto }) {
  return (
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
          <span className="text-primary-500 text-lg font-bold">"</span>
        </div>
      </div>
    </div>
  );
}
