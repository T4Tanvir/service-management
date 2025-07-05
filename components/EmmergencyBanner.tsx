import { AlertTriangle } from "lucide-react";

export default function EmergencyBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 h-10 z-50 bg-red-600 text-white py-2 px-4 text-center text-sm font-medium animate-pulse">
      <div className="flex items-center justify-center space-x-2">
        <AlertTriangle size={16} className="text-yellow-300" />
        <span>🚨 EMERGENCY SERVICES AVAILABLE 24/7 🚨</span>
        <span className="text-yellow-300 font-bold">• 5% Extra Charge</span>
      </div>
    </div>
  );
}
