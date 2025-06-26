"use client";
import React, { ReactNode } from "react";
import DashboardSidebar from "./component/dahsboardSidebar";
import DashboardHeader from "./component/dashboardHeader";

interface LayoutProps {
  children: ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
}

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  activePage,
  setActivePage,
}) => {
  return (
    <html lang="en">
      <body>
        <div className="h-screen bg-gray-50 flex overflow-hidden">
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
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
