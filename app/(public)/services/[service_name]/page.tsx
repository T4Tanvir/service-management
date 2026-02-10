import BookNow from "@/components/BookNow";
import { FloatingBookButton } from "@/components/FloatingBookBtn";
import Footer from "@/components/footer";
import Testimonials from "@/components/Testimonial";
import { FaqDto } from "@/dtos/faq.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { getFaqByServiceId } from "@/lib/services/faq_crud_service";
import { getTopReviewByServiceId } from "@/lib/services/review_crud_service";
import {
  getChildServiceByParentIdId,
  getServiceDetailByName,
} from "@/lib/services/service_crud_service";
import AllServices from "../../feature/allServices";
import FaqList from "../../feature/FaqList";
import How from "../../feature/How";
import WhyChoose from "../../feature/WhyChoose";
import Hero from "./feature/Hero";
import { generateMetadata } from "./layout";
import { getFeatureListByServiceId } from "@/lib/services/feature_crud_service";

import AdditionalFeature from "./feature/AdditionalFeature";

type ServiceDetailPageProps = {
  params: {
    service_name: string;
  };
};

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { service_name } = await params;
  const service_real_name = service_name.split("-").join(" ");
  const service_details = await getServiceDetailByName(service_real_name);

  generateMetadata({
    params: {
      service_name: service_real_name,
      description: service_details[0].description || "",
    },
  });

  const childServices = service_details[0]
    ? await getChildServiceByParentIdId(service_details[0].id)
    : [];
  const faqData = service_details[0]
    ? await getFaqByServiceId(service_details[0].id)
    : [];
  const reviews = service_details[0]
    ? await getTopReviewByServiceId(service_details[0].id)
    : [];

  const featureList = service_details[0]
    ? await getFeatureListByServiceId(service_details[0].id)
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Hero
          service={new ServiceDto(service_details[0])}
          nestedServices={service_details}
        />

        {childServices.length > 0 ? (
          <AllServices
            services={childServices.map((item) => new ServiceDto(item))}
          />
        ) : (
          <AdditionalFeature featureList={featureList} />
        )}

        <How />
        <WhyChoose />
        <Testimonials testimonials={reviews} />
        <FaqList faqList={faqData.map((item) => new FaqDto(item))} />
        <BookNow />
      </main>
      <Footer />
      <FloatingBookButton />
    </div>
  );
}
