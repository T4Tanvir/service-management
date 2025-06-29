"use client";
import React, { useState } from "react";
import { Wrench, Menu, X } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-3`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          <Link href="/">
            <div className="flex items-center">
              <Wrench size={32} className="text-primary-600 mr-2" />
              <span className={`text-xl font-bold ${"text-primary-700"}`}>
                Peace Home Empire
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {[
                {
                  name: "Home",
                  path: "/",
                },
                {
                  name: "Services",
                  path: "/#services",
                },
                {
                  name: "Testimonial",
                  path: "/#testimonials",
                },
                {
                  name: "Faq",
                  path: "/#faq",
                },
                {
                  name: "Contact",
                  path: "/#contact",
                },
                {
                  name: "Dashboard",
                  path: "/dashboard",
                },
                {
                  name: "Gallery",
                  path: "/gallery",
                },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`font-medium hover:text-primary-500 transition-colors
                      text-gray-800
                    `}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="hidden sm:block bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
              onClick={() => {
                window.location.href = "tel:+8801712345678";
              }}
            >
              Call Now
            </button>
            <Link href="/auth">
              <button className="hidden sm:block bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
                Login
              </button>
            </Link>
            <button
              className="lg:hidden text-primary-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
          <nav className="mt-4 pb-4">
            <ul className="space-y-2">
              {[
                "Home",
                "Services",
                "About",
                "Testimonials",
                "FAQ",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={`block py-2 px-4 font-medium hover:bg-primary-50 rounded transition-colors ${"text-gray-800"}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <button className="w-full sm:hidden bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Call Now
                </button>
              </li>
              <li className="pt-2">
                <button
                  className="hidden sm:block bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
                  onClick={() => {
                    window.location.href = "/login";
                  }}
                >
                  Login
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
