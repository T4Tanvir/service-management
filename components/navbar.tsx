"use client";
import { Menu, Wrench, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavItem {
  name: string;
  path: string;
  canSee?: boolean;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const [loginSession, setLoginSession] = useState<any>(null);

  const navigationItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/#services" },
    { name: "Testimonial", path: "/#testimonials" },
    { name: "FAQ", path: "/#faq" },
    { name: "Contact", path: "/#contact" },
    {
      name: "Dashboard",
      path: "/dashboard",
      canSee: !!loginSession,
    },
    { name: "Gallery", path: "/gallery" },
  ];

  const mobileNavigationItems = [
    "Home",
    "Services",
    "About",
    "Testimonials",
    "FAQ",
    "Contact",
  ];

  const visibleNavItems = navigationItems.filter(
    (item) => item.canSee !== false
  );

  const handleCallNow = () => {
    window.location.href = "tel:+601139573908";
  };

  const handleMobileMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  // Logout function using AuthJS
  const handleLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/", // Redirect to home page after logout
        redirect: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    setLoginSession(session);
  }, [session]);

  return (
    <header className="fixed left-0 right-0 top-8 sm:top-10 z-50 transition-all duration-300 bg-white shadow-md py-0 sm:py-3 ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Wrench size={32} className="text-primary-600 mr-2" />
            <span className="text-xl font-bold text-primary-700">
              Peace Home Empire
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex space-x-8">
              {visibleNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className="font-medium hover:text-primary-500 transition-colors text-gray-800"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="hidden cursor-pointer sm:block bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
              onClick={handleCallNow}
            >
              Call Now
            </button>

            {loginSession ? (
              <div className="hidden sm:flex items-center space-x-2">
                <button
                  onClick={handleLogout}
                  className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/auth">
                <button className="hidden cursor-pointer sm:block bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
                  Login
                </button>
              </Link>
            )}

            <button
              className="lg:hidden text-primary-600"
              onClick={handleMobileMenuToggle}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4">
            <ul className="space-y-2">
              {mobileNavigationItems.map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="block py-2 px-4 font-medium hover:bg-primary-50 rounded transition-colors text-gray-800"
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </Link>
                </li>
              ))}

              <li className="pt-2">
                <button
                  className="w-full cursor-pointer  sm:hidden bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
                  onClick={handleCallNow}
                >
                  Call Now
                </button>
              </li>

              <li className="pt-2">
                {loginSession ? (
                  <div className="space-y-2">
                    <button
                      onClick={handleLogout}
                      className="w-full cursor-pointer sm:hidden bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link href="/auth">
                    <button className="w-full cursor-pointer sm:hidden bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-md font-medium transition-colors">
                      Login
                    </button>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
