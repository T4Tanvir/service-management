"use client";
import { Bell, ChevronDown, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

const DashboardHeader: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session } = useSession();
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
  return (
    <header className="bg-white shadow-sm">
      <div className="flex items-center justify-end px-6 py-4">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
            <Bell size={20} />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 focus:outline-none"
            >
              <span className="text-gray-700">
                {session?.user.name || "Admin User"}
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <LogOut size={16} />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
