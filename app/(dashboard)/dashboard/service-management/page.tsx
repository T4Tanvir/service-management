"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Faq from "./feature/faq/faq";
import Service from "./feature/service/service";
import ServiceFeature from "./feature/serviceFeature/serviceFeature";
import ReviewTable from "./feature/review/ReviewTable";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-4 px-2 sm:py-6 sm:px-4 md:px-6" >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        Service Management
      </h1>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="flex flex-wrap gap-2 w-full mb-6 sm:mb-10">
          <TabsTrigger value="services" className="flex-1 min-w-[120px]">
            Services
          </TabsTrigger>
          <TabsTrigger value="faqs" className="flex-1 min-w-[120px]">
            FAQs
          </TabsTrigger>
          <TabsTrigger value="features" className="flex-1 min-w-[120px]">
            Features
          </TabsTrigger>
          <TabsTrigger value="review" className="flex-1 min-w-[120px]">
            Review
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Service />
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4">
          <Faq />
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <ServiceFeature />
        </TabsContent>
        <TabsContent value="review" className="space-y-4">
          <ReviewTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
