"use client";
import {
  FileText,
  Home,
  Image,
  ListOrdered,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";

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
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary-600">Peace Home Empire</span>
          </div>
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
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => setActivePage(item.label)}
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
  );
};

export default DashboardSidebar;
