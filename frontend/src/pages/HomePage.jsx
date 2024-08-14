import React from 'react';
import About from '../components/main/About';
import FileInput from '../components/main/FileInput';
import Hero from '../components/main/Hero';
import PredictionStats from '../components/main/PredictionStats';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="grid grid-cols-1 md:grid-cols-2  space-x-5  p-10 gap-10 w-screen overflow-hidden h-full items-center justify-center bg-base-200 z-0">
        <FileInput />
        <PredictionStats />
      </div>
      <About />
    </div>
  );
};

export default HomePage;
