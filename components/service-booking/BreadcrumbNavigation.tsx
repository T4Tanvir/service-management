"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { NavigationPath } from '../../type/service.type';

interface BreadcrumbNavigationProps {
  navigationPath: NavigationPath[];
  onNavigateToRoot: () => void;
  onNavigateToBreadcrumb: (index: number) => void;
  onNavigateBack: () => void;
}

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  navigationPath,
  onNavigateToRoot,
  onNavigateToBreadcrumb,
  onNavigateBack,
}) => {
  return (
    <div className="sticky top-0 bg-white py-2 border-b">
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={onNavigateToRoot}
          className="p-1 h-auto"
        >
          <Home className="h-4 w-4" />
        </Button>
        {navigationPath.map((item, index) => (
          <div key={item.id} className="flex items-center gap-2">
            <span>{">"}</span>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onNavigateToBreadcrumb(index)}
              className="p-1 h-auto text-blue-600 hover:text-blue-800"
            >
              {item.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          {navigationPath.length === 0
            ? "Service Category"
            : navigationPath[navigationPath.length - 1]?.name}
        </h3>
        {navigationPath.length > 0 && (
          <Button size="sm" variant="ghost" onClick={onNavigateBack}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Go Back
          </Button>
        )}
      </div>
    </div>
  );
};
