import React from "react";
import { RefreshCcw, Truck, Phone } from "lucide-react";

const Services = () => {
  const features = [
    {
      icon: <RefreshCcw />,
      title: "30 DAYS RETURN",
      desc: "Simply return it within 30 days for an exchange.",
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
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4 text-gray-700">
                {React.cloneElement(item.icon, { size: 36, strokeWidth: 1.5 })}
              </div>

              <h4 className="font-semibold tracking-wide text-sm uppercase mb-2 text-black">
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
