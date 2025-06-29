// app/components/FaqList.tsx (Server Component)

import { FaqDto } from "@/dtos/faq.dto";

export default function FaqList({ faqList }: { faqList: FaqDto[] }) {
  return (
    <div id="faq" className="py-12 md:py-24 lg:py-32 bg-primary-50">
      <div className="relative max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary-100 px-3 py-1 text-sm text-primary-600">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our services.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <details
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <summary className="cursor-pointer px-8 py-6 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300">
                <h3 className="text-lg font-semibold text-gray-900 pr-8 group-hover:text-blue-600 transition-colors duration-300">
                  {faq.question}
                </h3>
                <span className="text-gray-400 group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>

              <div className="px-8 pb-6">
                <div className="w-full h-px bg-gradient-to-r from-blue-200 to-purple-200 mb-4"></div>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
