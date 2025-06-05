"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Faq from "./feature/faq/faq";
import Service from "./feature/service/service";
import ServiceFeature from "./feature/serviceFeature/serviceFeature";

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">Service Management</h1>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
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
      </Tabs>
    </div>
  );
}

