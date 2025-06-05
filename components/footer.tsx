import React from "react";
import {
  Wrench,
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Wrench size={28} className="text-accent-500 mr-2" />
              <span className="text-xl font-bold">ProPlumb</span>
            </div>
            <p className="text-gray-400 mb-6">
              Professional plumbing services for residential and commercial
              properties. Licensed, insured, and trusted by thousands of
              customers.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-primary-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "#home" },
                { name: "About Us", link: "#about" },
                { name: "Services", link: "#services" },
                { name: "Testimonials", link: "#testimonials" },
                { name: "FAQ", link: "#faq" },
                { name: "Contact", link: "#contact" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Water Plumbing",
                "Gas Line Services",
                "Sewerage Services",
                "Water Filtration",
                "Fire Protection",
                "Pool Plumbing",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone
                  size={18}
                  className="text-accent-500 mt-1 mr-3 flex-shrink-0"
                />
                <div>
                  <p className="text-white">(555) 123-4567</p>
                  <p className="text-gray-400 text-sm">
                    24/7 Emergency Service
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail
                  size={18}
                  className="text-accent-500 mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-400">info@proplumb.com</span>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={18}
                  className="text-accent-500 mt-1 mr-3 flex-shrink-0"
                />
                <span className="text-gray-400">
                  123 Plumbing Way, Watertown, CA 90210
                </span>
              </li>
              <li className="flex items-start">
                <Clock
                  size={18}
                  className="text-accent-500 mt-1 mr-3 flex-shrink-0"
                />
                <div>
                  <p className="text-white">Hours:</p>
                  <p className="text-gray-400">Mon-Fri: 7am-7pm</p>
                  <p className="text-gray-400">Sat: 8am-5pm</p>
                  <p className="text-gray-400">Emergency: 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} ProPlumb. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Site Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
