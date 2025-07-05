"use client";
import React from "react";
import FreeQuoteForm from "./FreeQuoteForm";
import Link from "next/link";

const BookNow: React.FC = () => {
  const handleCallNow = () => {
    window.location.href = "tel:+601139573908";
  };

  return (
    <section className="py-20 bg-primary-800" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Book Your Service Today
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Whether you need emergency repairs or routine maintenance, our
              team of expert Employee is just a call away. Schedule your service
              now and experience the professional difference.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                "Fast response times",
                "Transparent, upfront pricing",
                "Licensed and insured professionals",
                "Satisfaction guaranteed",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-white">
                  <svg
                    className="w-5 h-5 text-accent-400 mr-3"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                className="cursor-pointer bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
              onClick={handleCallNow}
              >
                Call Now
              </button>
              <Link href="/#services">
                <button className="cursor-pointer bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium transition-colors">
                  View Service Areas
                </button>
              </Link>
            </div>
          </div>

          <FreeQuoteForm />
        </div>
      </div>
    </section>
  );
};

export default BookNow;
