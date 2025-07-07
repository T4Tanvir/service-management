import { AlertTriangle } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 h-8 sm:h-10 z-[60] bg-red-600 text-white py-1 sm:py-2 px-2 sm:px-4 text-center text-xs sm:text-sm font-medium animate-pulse">
      <div className="flex items-center justify-center space-x-1 sm:space-x-2 h-full">
        <AlertTriangle size={14} className="text-yellow-300 sm:block hidden" />
        <span className="truncate">🚨 EMERGENCY SERVICES 24/7 🚨</span>
        <span className="text-yellow-300 font-bold whitespace-nowrap text-xs sm:text-sm">
          • 5% Extra
        </span>
      </div>
    </div>
  );
}