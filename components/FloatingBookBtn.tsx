import ServiceBooking from "./service-booking/ServicingBook";

export function FloatingBookButton() {
  return (
    <>
      <div className="hidden md:block fixed top-1/2 right-4 z-50 transform -translate-y-1/2">
        <ServiceBooking />
      </div>

      {/* Mobile Floating Button - Bottom center */}
      <div className="md:hidden  fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <ServiceBooking />
      </div>
    </>
  );
}
