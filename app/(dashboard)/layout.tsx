"use client";
import React, { ReactNode, useState } from "react";
import DashboardSidebar from "./component/dahsboardSidebar";
import DashboardHeader from "./component/dashboardHeader";
import { SessionProvider } from "next-auth/react";

const DashboardLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>("");
  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      <SessionProvider>
        {/* Sidebar */}
        <DashboardSidebar
          activePage={activePage}
          setActivePage={setActivePage}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader activePage={activePage} />

          {/* Main Content - Scrollable */}
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </SessionProvider>
    </div>
  );
};

export default DashboardLayout;
