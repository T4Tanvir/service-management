import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import faqItems from '../data/faq';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our plumbing services. If you don't see your question here, please contact us directly.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`mb-4 border rounded-lg transition-all duration-300 ${
                openIndex === index 
                  ? 'border-primary-300 bg-primary-50 shadow-md' 
                  : 'border-gray-200 bg-white'
              }`}
              data-aos="fade-up" 
              data-aos-delay={index * 50}
            >
              <button
                className="flex justify-between items-center w-full p-5 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg text-gray-900">{item.question}</span>
                <span className={`ml-6 flex-shrink-0 ${openIndex === index ? 'text-primary-600' : 'text-gray-400'}`}>
                  {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-600">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
            Contact Our Support Team
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;