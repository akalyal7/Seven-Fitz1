import React from "react";
import { RefreshCcw, Truck, Phone } from "lucide-react";

const Services = () => {
  const features = [
    {
      icon: <RefreshCcw />,
      title: "30 DAYS RETURN",
      desc: "If any damage simply return it within 30 days for an exchange.",
    },
    {
      icon: <Truck />,
      title: "FREE US DELIVERY",
      desc: "On orders over $200!",
    },
    {
      icon: <Phone />,
      title: "SUPPORT 24/7",
      desc: "Contact us 24 hours a day, 7 days a week",
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-[#e5a852] font-semibold uppercase tracking-[0.4em] text-xs block mb-4">
            Our Services
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
            Why Choose <span className="text-[#e5a852]">Us</span>
          </h2>

          <div className="w-20 h-0.75 bg-linear-to-r from-yellow-400 via-[#e5a852] to-yellow-700 mx-auto rounded-full mt-4" />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-10 text-center shadow-sm hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-6 text-[#e5a852]">
                {React.cloneElement(item.icon, { size: 40, strokeWidth: 1.5 })}
              </div>

              <h4 className="font-serif font-semibold text-lg text-gray-900 mb-2">
                {item.title}
              </h4>

              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
