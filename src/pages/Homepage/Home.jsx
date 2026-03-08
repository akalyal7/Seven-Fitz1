import React from 'react';
import Hero from './Hero';
import AboutStory from './AboutStory';
import Services from './Services';
import Expertise from './Expertise';
import FeaturedProducts from './FeaturedProducts';
import Categories from './Categories';
import OfferSection from './OfferSection';
import NewArrivals from './NewArrivals';
import SocialGallery from './SocialGallery';
import ProductShowcase from './ProductShowcase';
import Testimonials from './Testimonials';
import CollectionSection from './CollectionSection';
import NewArrivalssection2 from './NewArrivalssection2';

const Home = () => {
  return (
    <div className="bg-white text-secondary-900 overflow-hidden selection:bg-[#e5a852] selection:text-black">

      <Hero />
      <Services />
      <Categories />
      <OfferSection />
      <FeaturedProducts />
      <NewArrivalssection2 />
      <Testimonials />

      {/* <AboutStory /> */}
      {/* <Expertise /> */}
      {/* <CollectionSection /> */}
      {/* <NewArrivals /> */}
      {/* <ProductShowcase /> */}
      {/* <SocialGallery /> */}
       
    </div>
  );
};

export default Home;


