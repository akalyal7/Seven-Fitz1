import React from 'react';
import Hero from '../components/home/Hero';
import AboutStory from '../components/home/AboutStory';
import Services from '../components/home/Services';
import Expertise from '../components/home/Expertise';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Categories from '../components/home/Categories';
import NewArrivals from '../components/home/NewArrivals';
import SocialGallery from '../components/home/SocialGallery';

const Home = () => {
  return (
    <div className="bg-white text-secondary-900 overflow-hidden selection:bg-[#e5a852] selection:text-black">
      <Hero />
      {/* <AboutStory /> */}
      <Services />
      {/* <Expertise /> */}
      <FeaturedProducts />
      <Categories />
      <NewArrivals />
      <SocialGallery />
    </div>
  );
};

export default Home;


