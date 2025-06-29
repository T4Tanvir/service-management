import { FeatureDto } from "@/dtos/feature.dto";
import { CheckCircle } from "lucide-react";
import React from "react";

interface AdditionalFeatureProps {
  featureList: FeatureDto[];
}

const AdditionalFeature: React.FC<AdditionalFeatureProps> = ({
  featureList,
}) => {
  return (
    <section id="service-features" className="py-12 md:py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              Service Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              What We Provide Under This Service
            </h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 rounded-lg bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-primary-100"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-white shadow-sm flex-shrink-0">
                <CheckCircle className="size-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {feature.feature_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeature;
