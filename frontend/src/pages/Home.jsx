import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/molecules/HeroSection';
import HowItWorks from '../components/molecules/HowItWorks';
import FeaturedAnime from '../components/molecules/FeaturedAnime';
import Footer from '../components/molecules/Footer';

const Home = () => {
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <HeroSection />
          <HowItWorks />
          <FeaturedAnime />
          {/* Add more sections here as needed */}
        </main>
        <Footer />
      </div>
    </AppLayout>
  );
};

export default Home;