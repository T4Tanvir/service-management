import { FeatureDto } from "@/dtos/feature.dto";
import { CheckCircle, Sparkles, Star } from "lucide-react";
import React from "react";

interface AdditionalFeatureProps {
  featureList: FeatureDto[];
}

const AdditionalFeature: React.FC<AdditionalFeatureProps> = ({
  featureList,
}) => {
  return (
    <section
      id="service-features"
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-100 to-cyan-100 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-6 text-center mb-20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
              <Sparkles className="size-4" />
              Service Features
            </div>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              What We Provide Under
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                This Service
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto" />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
            >
              {/* Card background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                  <CheckCircle className="size-7 text-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700 leading-relaxed font-medium group-hover:text-gray-900 transition-colors duration-300">
                    {feature.feature_text}
                  </p>

                  {/* Decorative star for premium feel */}
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Star className="size-4 text-yellow-400 fill-current" />
                  </div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-gray-300" />
            <Sparkles className="size-4 text-blue-500" />
            <span className="font-medium">Premium Service Quality</span>
            <Sparkles className="size-4 text-purple-500" />
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-gray-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdditionalFeature;
