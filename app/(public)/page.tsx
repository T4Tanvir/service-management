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

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function Home() {
  try {
    console.log("Fetching data at:", new Date().toISOString());

    const [servicesData, faqDataRaw, reviewsData] = await Promise.all([
      getChildServiceByParentIdId(null),
      getFaqByServiceId(1),
      getTopReview(10),
    ]);

    const services = servicesData.map((item) => new ServiceDto(item));
    const faqData = faqDataRaw.map((item) => new FaqDto(item));

    return (
      <div className="flex min-h-screen flex-col">
        <EmergencyBanner />

        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          <AllServices services={services} />

          <How />

          <WhyChoose />

          <Testimonial testimonials={reviewsData} />
          <FaqList faqList={faqData} />

          <BookNow />
        </main>
        <Footer />

        <FloatingBookButton />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);

    return (
      <div className="flex min-h-screen flex-col">
        <EmergencyBanner />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              We're having trouble loading the page. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default Home;
