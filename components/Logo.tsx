import { Wrench } from "lucide-react";
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="bg-accent-600 p-4 rounded-2xl shadow-lg">
      <Wrench className="w-8 h-8 text-white" />
    </div>
  );
};

export default Logo;
