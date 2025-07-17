"use client";
import {
  FileText,
  Home,
  Image,
  ListOrdered,
  Settings,
  Users,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface SidebarItem {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  path?: string;
}

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const DashboardSidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
}) => {
  const [open, setOpen] = useState(false);

  const sidebarItems: SidebarItem[] = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Users, label: "Users", path: "/dashboard/users" },
    { icon: Image, label: "Gallery", path: "/dashboard/gallery" },
    { icon: FileText, label: "Reports", path: "/dashboard/report" },
    {
      icon: Settings,
      label: "Free Quote",
      path: "/dashboard/free-quote",
    },
    {
      icon: ListOrdered,
      label: "Order Management",
      path: "/dashboard/order-management",
    },
    {
      icon: Settings,
      label: "Service Management",
      path: "/dashboard/service-management",
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-4 border-b flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">Peace Home Empire</span>
            {/* Close button for mobile */}
            <button
              className="md:hidden ml-2"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {sidebarItems.map((item) => (
                <li key={item.label}>
                  {item.path ? (
                    <Link
                      href={item.path}
                      className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors text-gray-600 hover:bg-gray-50"
                      onClick={() => setOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setActivePage(item.label);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                        activePage === item.label
                          ? "bg-primary-50 text-primary-600"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
