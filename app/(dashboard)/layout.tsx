"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode, useState } from "react";
import DashboardSidebar from "./component/dahsboardSidebar";
import DashboardHeader from "./component/dashboardHeader";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>("");
  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 bg-white shadow-md md:h-screen md:sticky md:top-0">
          <DashboardSidebar
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <DashboardHeader />
          </header>

          {/* Main Content - Scrollable */}
          <main className="flex-1 p-1 sm:p-6 bg-gray-50 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
