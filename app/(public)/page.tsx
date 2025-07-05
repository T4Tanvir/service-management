import BookNow from "@/components/BookNow";
import EmergencyBanner from "@/components/EmmergencyBanner";
import { FloatingBookButton } from "@/components/FloatingBookBtn";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Testimonial from "@/components/Testimonial";
import { FaqDto } from "@/dtos/faq.dto";
import { ServiceDto } from "@/dtos/service.dto";
import { getFaqByServiceId } from "@/lib/services/faq_crud_service";
import { getTopReview } from "@/lib/services/review_crud_service";
import { getChildServiceByParentIdId } from "@/lib/services/service_crud_service";
import AllServices from "./feature/allServices";
import FaqList from "./feature/FaqList";
import Hero from "./feature/hero";
import How from "./feature/How";
import WhyChoose from "./feature/WhyChoose";

async function Home() {
  const services = await getChildServiceByParentIdId(null);
  const faqData = await getFaqByServiceId(1);
  const reviews = await getTopReview(10);

  return (
    <div className="flex min-h-screen flex-col">
      <EmergencyBanner />

      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        <AllServices services={services.map((item) => new ServiceDto(item))} />

        <How />

        <WhyChoose />

        <Testimonial testimonials={reviews} />
        <FaqList faqList={faqData.map((item) => new FaqDto(item))} />

        <BookNow />
      </main>
      <Footer />

      <FloatingBookButton />
    </div>
  );
}

export default Home;
