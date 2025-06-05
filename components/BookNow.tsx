import React from 'react';

const BookNow: React.FC = () => {
  return (
    <section className="py-20 bg-primary-800" id="contact">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Book Your Plumbing Service Today
            </h2>
            <p className="text-primary-100 text-lg mb-8">
              Whether you need emergency repairs or routine maintenance, our team of expert plumbers is just a call away. Schedule your service now and experience the professional difference.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                'Fast response times',
                'Transparent, upfront pricing',
                'Licensed and insured professionals',
                'Satisfaction guaranteed'
              ].map((item, index) => (
                <li key={index} className="flex items-center text-white">
                  <svg className="w-5 h-5 text-accent-400 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3 rounded-md font-medium transition-colors">
                Call Now
              </button>
              <button className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-md font-medium transition-colors">
                View Service Areas
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8" data-aos="fade-left">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Service</h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium mb-1">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium mb-1">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-1">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="service" className="block text-gray-700 text-sm font-medium mb-1">Service Needed</label>
                <select 
                  id="service" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="water-plumbing">Water Plumbing</option>
                  <option value="gas-line-plumbing">Gas Line Plumbing</option>
                  <option value="sewerage-plumbing">Sewerage Plumbing</option>
                  <option value="water-filtration">Water Filtration</option>
                  <option value="fire-plumbing">Fire Protection Plumbing</option>
                  <option value="swimming-pool">Swimming Pool Plumbing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 text-sm font-medium mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Please describe your plumbing issue"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-md font-medium transition-colors"
              >
                Schedule Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookNow;