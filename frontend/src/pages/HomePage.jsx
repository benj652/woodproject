import React from 'react';
import About from '../components/main/About';
import FileInput from '../components/main/FileInput';
import Hero from '../components/main/Hero';
import PredictionStats from '../components/main/PredictionStats';
import { useUserContext } from '../context/UserContext';

const HomePage = () => {
  const { user } = useUserContext();
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div
        className={`grid grid-cols-1  space-x-5  p-10 gap-10 w-screen overflow-hidden h-full items-center justify-center bg-base-200 z-0 ${
          user ? 'md:grid-cols-2' : 'md:grid-cols-3 cursor-not-allowed opacity-30'
        }`}
      >
        <FileInput />
        {!user && <div className="text-center text-4xl w-full"> ⛔Requires Account</div>}
        <PredictionStats />
      </div>
      <About />
    </div>
  );
};

export default HomePage;
